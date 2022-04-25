import { moduleScopeKey } from "./constants.js";
import { ImportModuleDialog } from "./importDialog.js";

class ImportFormWrapper extends FormApplication {
  render() {
    new ImportModuleDialog().render(true);
  }
}

Hooks.on("init", () => {
  game.settings.registerMenu(moduleScopeKey, "import", {
    name: "Import Compendium",
    label: "Import",
    hint: "This will import Coriolis Community Atlas scenes and journal entries to Coriolis Community Atlas folders.",
    type: ImportFormWrapper,
    restricted: true,
  });
});

Hooks.on("renderJournalSheet", (app, html, options) => {
  const editableElements = html.find(".window-content .editable");
  const atlasJournal = editableElements.find(
    "div.coriolis-community-atlas-journal-entry"
  );
  if (
    atlasJournal &&
    atlasJournal.length > 0 &&
    !editableElements.hasClass("coriolis-core")
  ) {
    editableElements.addClass("coriolis-core");
    editableElements
      .find(".editor-content")
      .wrap(
        '<div class="entryBGVTT"><div class="entryContainer"><div class="entryContent"></div></div></div>'
      );
  }
});
