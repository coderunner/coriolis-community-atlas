import { moduleScopeKey } from "./constants.js";
import { getSingleFolder, createFolderPath, FOLDER_TYPES } from "./folders.js";

const ROOT_DIR_FOLDER_NAME = "Coriolis Community Atlas";

export async function importContent() {
  let errors = [];

  let journalFolder = getSingleFolder(
    null,
    ROOT_DIR_FOLDER_NAME,
    FOLDER_TYPES.journal
  );

  if (!!journalFolder) {
    errors.push(
      `Journal folder ${ROOT_DIR_FOLDER_NAME} already exists. Skipping import.`
    );
  } else {
    await createFolderPath(
      ROOT_DIR_FOLDER_NAME,
      FOLDER_TYPES.journal,
      "#000000"
    );

    for (const n of [
      "Algol",
      "Altai",
      "Dabaran",
      "Mira",
      "Odacon",
      "Ordana",
      "Sadaal",
      "Sivas",
      "Pillar",
      "Zalos",
      "Zhau",
    ]) {
      const folderName = n === "Pillar" ? "The Quadrant of the Pillar" : n;
      const f = await createFolderPath(
        `${ROOT_DIR_FOLDER_NAME}/${folderName}`,
        FOLDER_TYPES.journal,
        "#000000"
      );
      await importPack(
        `${moduleScopeKey}.${n.toLowerCase()}_journals`,
        game.journal,
        f.id
      );
    }
  }

  let sceneFolder = getSingleFolder(
    null,
    ROOT_DIR_FOLDER_NAME,
    FOLDER_TYPES.scene
  );
  if (!!sceneFolder) {
    errors.push(
      `Scene folder ${ROOT_DIR_FOLDER_NAME} already exists. Skipping import.`
    );
  } else {
    await createFolderPath(ROOT_DIR_FOLDER_NAME, FOLDER_TYPES.scene, "#000000");

    for (const n of [
      "Algol",
      "Altai",
      "Dabaran",
      "Mira",
      "Odacon",
      "Ordana",
      "Sadaal",
      "Sivas",
      "Zalos",
      "Zhau",
    ]) {
      const f = await createFolderPath(
        `${ROOT_DIR_FOLDER_NAME}/${n}`,
        FOLDER_TYPES.scene,
        "#000000"
      );
      await importPack(
        `${moduleScopeKey}.${n.toLowerCase()}_scenes`,
        game.scenes,
        f.id
      );
    }
  }

  for (const e of errors) {
    ui.notifications.notify(e);
  }
}

async function importPack(packName, importer, targetFolderId) {
  const pack = game.packs.get(packName);
  if (!pack) {
    ui.notifications.notify(`${packName} pack not found`);
    return;
  }

  const pIndex = await pack.getIndex();
  for await (const entity of pIndex.map((e) => pack.getDocument(e._id))) {
    importer.importFromCompendium(
      pack,
      entity.id,
      {
        folder: targetFolderId,
      },
      { keepId: true }
    );
  }
}
