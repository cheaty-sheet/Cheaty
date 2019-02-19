import CheatySheet from "../../CheatySheet.class";
import Renderer from "./Renderer.interface";
import Render from "./Render.interface";
const fs = require('fs');

class HTMLRender implements Render {
    content: string = '';
    styles: { [key: string]: { [key: string]: string | number } } = {
        'body': {
            'background-color': '#FFFFFF',
        },
        '.row': {
            'display': 'flex',
            'align-items': 'center',
            'justify-content': 'space-between',
        },
        '.col': {
            display: 'flex',
        },
        '.sheetTitle': {
        },
        '.sheetAuthor': {
            'font-style': 'italic',
            'color': 'gray',
        },
        '.blocks': {
            'column-count': 2,
            'column-gap': '0',
        },
        '.block': {
            'break-inside': 'avoid',
            'page-break-inside': 'avoid',
            '-webkit-column-break-inside': 'avoid',
        },
        '.blockInside': {
            'border': '1px solid gray',
            'box-shadow': 'black 2px 2px',
            'padding': '4px',
            'margin-bottom': '8px',
            'margin-right': '4px',
            'margin-left': '4px',
        },
        '.blockTitle': {
            padding: '0',
            margin: '0',
            'font-size': '1em',
        },
        '.blockContent': {
            padding: '0',
        },
    };

    /**
     * Overrides the content of the HTML Page.
     */
    setContent(content: string): void {
        this.content = content;
    }

    /**
     * Add content to the HTML page (with line break).
     */
    appendContent(content: string): void {
        this.content += `\n${content}`;
    }

    saveToDisk(path: string): void {
        fs.writeFileSync(path, this.toString());
    }

    toString(): string {
        return `<!doctype html>
  <html>
    <link rel="stylesheet" href="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/styles/default.min.css">
    <script src="//cdnjs.cloudflare.com/ajax/libs/highlight.js/9.14.2/highlight.min.js"></script>
    <script>hljs.initHighlightingOnLoad();</script>
  <head>\n\t\t<style>${Object.keys(this.styles).map((style: string) =>
            `\n${style} {${Object.keys(this.styles[style]).map((property: string) =>
                `\n\t${property}: ${this.styles[style][property]};`).join('')}\n}`
        ).join('')}\n\t\t</style>\n\t</head>\n\t<body>${this.content}\n\t</body>\n</html>`
    }
}

export default class HTMLRenderer implements Renderer {
    renderBlock(block: any, options: object = {}): string {
        let blockContent = '';

        if (block.sections) {
            blockContent = block.sections.map((section: any) => {
                switch (section.type) {
                    case 'text':
                        return `<p>${section.content}</p>`;
                    case 'code':
                        return `<pre><code class="${section.language || ''}">${section.content}</code></pre>`;
                    default:
                        throw new Error(`Unrecognized block content type: ${section.type}.`);
                }
            }).join('');
        }

        return `<div class="block"><div class="blockInside">
  <h2 class="blockTitle">${block.title}</h2>
  <section class="blockContent">${blockContent}</section></div>
</div>`;
    }

    async render(cheatySheet: CheatySheet, options: object = {}): Promise<Render> {
        const htmlRender = new HTMLRender();

        htmlRender.appendContent(`<div class="row">
  <div class="col">
    <h1>${cheatySheet.title}</h1>
  </div>
  <div class="col sheetAuthor">${cheatySheet.description}</div>
</div>`);

        htmlRender.appendContent(`<div class="blocks">${cheatySheet.blocks.map(block => this.renderBlock(block, options)).join('')}</div>`);


        return htmlRender;
    }
}