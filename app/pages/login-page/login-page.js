import { CellsPage } from '@cells/cells-page';
import { html } from 'lit-element';
import { BbvaCoreIntlMixin as intl } from '@bbva-web-components/bbva-core-intl-mixin';
import { bbvaHelp } from '@bbva-web-components/bbva-foundations-icons';
import { bbvaWebFormFieldAmbient } from '@bbva-web-components/bbva-web-form-field';
import { bbvaWebButtonDefaultAmbient } from '@bbva-web-components/bbva-web-button-default';
import { bbvaWebLinkAmbient } from '@bbva-web-components/bbva-web-link';

import '@bbva-experience-components/bbva-form-select/bbva-form-select.js';
import '@cells-components/pokeapi-dm/pokeapi-dm.js';
import '@cells-components/poke-card-ui/poke-card-ui.js';
import '@bbva-web-components/bbva-web-button-default/bbva-web-button-default.js';
import '@bbva-web-components/bbva-foundations-grid-default-layout/bbva-foundations-grid-default-layout.js';
import '@cells-demo/demo-app-template/demo-app-template.js';


import styles from './login-page-styles.js';

const menuHelp = bbvaHelp();

const DEFAULT_I18N_KEYS = {
  loginTitle: 'login-page.title',
  help: 'login-page.help',
  userInputLabel: 'login-page.user-input-label',
  userPasswordLabel: 'login-page.user-password-label',
  button: 'login-page.button',
  forgetPassword: 'login-page.forget-password',
  clientButton: 'login-page.client-button',
  typePokemon: 'login-page.type-pokemon'
};

class LoginMobilePage extends intl(CellsPage) {
  static get is() {
    return 'login-page';
  }

  static get properties() {
    return {
      pageState: {
        type: Object,
        attribute: false,
      },
      language: {
        type: String,
      },
      dark: {
        type: String,
      },
      i18nKeys: {
        type: Object,
        attribute: false,
      },
      listPokemon: {
        type: Array,
      },
      control: {
        type: Boolean,
      },
      detailsPokemon: { type: Array }
    };
  }

  static get styles() {
    return [
      styles,
      bbvaWebFormFieldAmbient.dark,
      bbvaWebButtonDefaultAmbient.dark,
      bbvaWebLinkAmbient.dark,
    ];
  }

  constructor() {
    super();
    this.i18nKeys = DEFAULT_I18N_KEYS;
    this.subscribe('page_state', (pageState) => (this.pageState = pageState));
    this.dispatchEvent(
      new CustomEvent('application-started', {
        bubbles: true,
        composed: true,
      })
    );
    this.listPokemon = [];
    this.control = true;
    this.detailsPokemon = [];
  }

  update(props) {
    if (props.has('i18nKeys')) {
      this._i18nKeys = { ...DEFAULT_I18N_KEYS, ...this.i18nKeys };
    }
    return super.update && super.update(props);
  }

  firstUpdated(props) {
    console.log(props);
    this.getPokemonList();
  }

  _setSettings() {
    window.IntlMsg.lang = this.language;
  }

  _navigateHelp(e) {
    e.preventDefault();
    e.stopPropagation();
    this.navigate('help');
  }

  get _title() {
    return html`
      <div class="neutral-primary" slot="app-main-content">
        <h1>Pokédex Pokémon Diego Mateus</h1>
        <h2>Buscador Pokémon</h2>
        <bbva-form-select
          label="Seleccione el tipo Pokémon"
          selector-aria-label="primary select"
          selector-completed-aria-label="culminated selector"
        >
          <bbva-form-option value="option1" selected>Option 1</bbva-form-option>
          <bbva-form-option value="option2">Option 2</bbva-form-option>
          <bbva-form-option value="option3">Option 3</bbva-form-option>
        </bbva-form-select>
        <br />
        <div class="list-cards">
          ${this.detailsPokemon.map(element => html`
          <div class="card-container">
            <poke-card-ui
              name=${element.name}
              urlImg=${element.urlImg}
              pokemonAttack=${element.pokemonAttack}
              pokemonDefense=${element.pokemonDefense}
              pokemonType=${element.pokemonType}
              pokemonSpeed=${element.pokemonSpeed}
            ></poke-card-ui>
          </div>
        `)}
        </div>
      </div>
    `;
  }


  render() {
    return html` <pokeapi-dm id="pokemonApi"></pokeapi-dm>
      <demo-app-template page-title="${this.t(this.i18nKeys.loginTitle)}">
        ${this._title}
      </demo-app-template>`;
  }

  getPokemonList() {
    console.log('entramos perra');
    const pokemons = [];
    if (this.control) {
      this.control = false;
      const pokemonApi = this.shadowRoot.querySelector('#pokemonApi');
      pokemonApi.getPokemonData();
      pokemonApi.addEventListener('get-pokemon-success', (ev) => {
        console.log('lalala => s', ev.detail.results);
        this.listPokemon = ev.detail.results;
        this.listPokemon.map((element) => {
          pokemons.push(element.name);
        });
        pokemons.map((element) => {
          this.getPokemonDetails(element);
        });
        console.log(this.detailsPokemon);
        this.control = true;
      });
    }
  }

  pause() {
    return new Promise(resolve => setTimeout(resolve, 2000));
  }

  async getPokemonDetails(namePokemon) {
    await this.pause();
    console.log(namePokemon);
    const pokemonApi = this.shadowRoot.querySelector('#pokemonApi');
    pokemonApi.getPokemonInfo(namePokemon);
    pokemonApi.addEventListener('get-pokemon-info-success', (ev) => {
      const newPokemon = ev.detail;
      const existingPokemon = this.detailsPokemon.find(
        (pokemon) => pokemon.id === newPokemon.id
      );
      if (!existingPokemon) {
        const pokemonSave = {
          id: newPokemon.id,
          name: newPokemon.name,
          urlImg: newPokemon.sprites.front_default,
          pokemonAttack: newPokemon.stats[1].base_stat,
          pokemonDefense: newPokemon.stats[2].base_stat,
          pokemonType: newPokemon.types[0].type.name,
          pokemonSpeed: newPokemon.stats[5].base_stat,
        };
        this.detailsPokemon = [...this.detailsPokemon, pokemonSave];
      }
    });
  }
}
window.customElements.define(LoginMobilePage.is, LoginMobilePage);
