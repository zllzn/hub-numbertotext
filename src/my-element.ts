import { TextField } from '@material/mwc-textfield';
import { PluginContract } from '@nintex/form-plugin-contract';
import { LitElement, css, html } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ToWords } from 'to-words';


const fire = <T>(
  element: HTMLElement,
  data: {
    bubbles?: boolean;
    cancelable?: boolean;
    composed?: boolean;
    detail?: T;
  }
) => {
  const args = {
    bubbles: true,
    cancelable: false,
    composed: true,
    ...data,
  };

  const event = new CustomEvent('ntx-value-change', args);
  element.dispatchEvent(event);
  return event;
};


@customElement('hub-numbertotext')
export class MyElement extends LitElement {

  @property({ type: ToWords })
  toWords = new ToWords({ localeCode: 'fr-FR' })
  @property()
  label!: string;
  @property()
  description!: string;
  @property({ type: Boolean })
  outlined: boolean = false;
  @property({ type: Boolean })
  readOnly: boolean = false;
  @property({ type: String })
  convertedvalue: string = "";


  static getMetaConfig(): Promise<PluginContract> | PluginContract {
    // plugin contract information
    return {
      controlName: 'Material Text field',
      fallbackDisableSubmit: false,
      iconUrl: 'one-line-text',
      version: '1',
      properties: {
        value: {
          type: 'string',
          title: 'Value',
          // this is to mark the field as value field. it should only be defined once in the list of properties
          isValueField: true,
          defaultValue: 0,
        },
      },
      standardProperties: {
        fieldLabel: true,
        description: true,
        defaultValue: true,
        readOnly: true,
      },
    };
  }

  render() {
    return html`
      <slot></slot>
      <div class="card">
      <input type="number" @change=${(e: any) => this.onInputValueChange(e.target.value)}/>
        <div>${this.convertedvalue}</div>
      </div>
    `
  }

  private onInputValueChange(value: number) {
    this.convertedvalue = this.toWords.convert(value);
  }

  static styles = css`
    :host {
      max-width: 1280px;
      margin: 0 auto;
      padding: 2rem;
      text-align: center;
    }

    .logo {
      height: 6em;
      padding: 1.5em;
      will-change: filter;
      transition: filter 300ms;
    }
    .logo:hover {
      filter: drop-shadow(0 0 2em #646cffaa);
    }
    .logo.lit:hover {
      filter: drop-shadow(0 0 2em #325cffaa);
    }

    .card {
      padding: 2em;
    }

    .read-the-docs {
      color: #888;
    }

    ::slotted(h1) {
      font-size: 3.2em;
      line-height: 1.1;
    }

    a {
      font-weight: 500;
      color: #646cff;
      text-decoration: inherit;
    }
    a:hover {
      color: #535bf2;
    }

    button {
      border-radius: 8px;
      border: 1px solid transparent;
      padding: 0.6em 1.2em;
      font-size: 1em;
      font-weight: 500;
      font-family: inherit;
      background-color: #1a1a1a;
      cursor: pointer;
      transition: border-color 0.25s;
    }
    button:hover {
      border-color: #646cff;
    }
    button:focus,
    button:focus-visible {
      outline: 4px auto -webkit-focus-ring-color;
    }

    @media (prefers-color-scheme: light) {
      a:hover {
        color: #747bff;
      }
      button {
        background-color: #f9f9f9;
      }
    }
  `
}


declare global {
  interface HTMLElementTagNameMap {
    'hub-numbertotext': MyElement
  }
}
