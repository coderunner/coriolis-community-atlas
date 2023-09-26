Hooks.on("renderJournalSheet", (app, html, options) => {
  if (app?.object?.flags?.core?.sourceId.includes("coriolis-community-atlas")) {
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
