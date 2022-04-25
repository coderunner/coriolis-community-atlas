import { importContent } from "./import.js";
import { moduleTitle } from "./constants.js";

export class ImportModuleDialog extends Dialog {
  constructor() {
    const diagOpts = {
      width: 500,
    };
    super(
      {
        title: `Import ${moduleTitle}`,
        content: `
<div>
<h1>Coriolis Community Atlas</h1>
<hr />
<p>This will import the content of the compendiums in <em>Coriolis Community Atlas</em> folders.</p>
</div>
`,
        buttons: {
          initialize: {
            label: "Import Compendium",
            callback: async () => {
              await importContent();
              ui.notifications.notify(
                "Coriolis Community Atlas imported successfully."
              );
            },
          },
          cancel: {
            label: "Cancel",
            callback: async () => {
              ui.notifications.notify("Import cancelled.");
            },
          },
        },
      },
      diagOpts
    );
  }
}
