export const moduleName = "coriolis-community-atlas";
export const showedWelcomePageSettingsKey = "showedWelcome";

Hooks.on("init", async () => {
  game.settings.register(moduleName, showedWelcomePageSettingsKey, {
    name: "Showed welcome journal entry.",
    scope: "world",
    config: false,
    type: Boolean,
    default: false,
  });
});

Hooks.on("ready", async () => {
  const showedWelcome = await game.settings.get(
    moduleName,
    showedWelcomePageSettingsKey,
    false
  );

  if (!showedWelcome) {
    const compendium = game.packs.find(
      (n) => n.metadata.id == moduleName + ".journals"
    );
    if (compendium) {
      const journal = await compendium.getDocument("gB9XzmSrZaxEbgFG");
      if (journal) {
        await journal.show(true);
        await game.settings.set(moduleName, showedWelcomePageSettingsKey, true);
      }
    }
  }
});

Hooks.on("renderJournalSheet", (app, html, options) => {
  if (
    app?.object?.flags?.core?.sourceId?.includes(moduleName) ||
    app?.object.pack?.includes(moduleName)
  ) {
    const content = html.find(".journal-entry-content");

    if (!content.hasClass("coriolis-core")) {
      content.addClass("coriolis-core");
    }
  }
});

Hooks.on("renderJournalPageSheet", (app, html, options) => {
  const atlasPage = html.find(".coriolis-community-atlas-journal-entry");
  if (atlasPage && atlasPage.length > 0) {
    const pageHeader = html.parent().find("header.journal-page-header");
    if (pageHeader && pageHeader.length > 0) {
      pageHeader.hide();
    }

    atlasPage.wrap(
      '<div class="entryBGVTT"><div class="entryContainer"><div class="entryContent"></div></div></div>'
    );
  }
});
