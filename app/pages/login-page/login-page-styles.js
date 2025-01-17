/* eslint-disable no-unused-vars */
import { css, unsafeCSS } from 'lit-element';
import * as foundations from '@bbva-web-components/bbva-foundations-styles';

export default css`
ul,
ol,
li,
figure,
p,
h1,
h2,
h3 {
  margin: 0;
  padding: 0;
}

ol,
ul {
  list-style: none;
  margin: 0;
  padding: 0;
}

.sr-only {
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  margin: -1px;
  overflow: hidden;
  padding: 0;
  position: absolute;
}

[slot=app-main-content] {
  height: 100%;
}

.content {
  display: flex;
  flex-direction: column;
  height: inherit;
}

.list-cards {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  margin-top: 3rem;
}

.card-container {
  padding: 30px;
}

.poke-card-ui {
  flex: 1 1 20%;
  margin: 10px;
  box-sizing: border-box;
}

poke-card-ui {
  box-sizing: border-box;
}
`;
