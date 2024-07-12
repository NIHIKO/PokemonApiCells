/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
[slot=app-main-content] {
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  height: inherit;
}

.main-inputs {
  margin: auto 0;
}
.main-inputs .input {
  margin-bottom: 1rem;
}

.input-link {
  display: block;
  text-align: right;
}

.main-buttons {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.main-buttons .input {
  margin-bottom: 1rem;
  min-width: 13rem;
}

.title {
  display: flex;
  color: var(--bbva-600, #000000);
  line-height: 1.2;
  font-weight: var(--font-weight--medium, 500);
  font-size: var(--cells-text-size-xl, 1.125rem);
  text-align: center;
}

`;
