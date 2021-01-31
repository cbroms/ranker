<div class="panel">
  <slot />
  <footer class="footer">
    <div class="footer-info">PhraseRanker Pro</div>
    <a class="about" href="/info/">
      <button>?</button>
    </a>
  </footer>
</div>

<style>
  .panel {
    position: relative;
    margin: 0 auto;
    max-width: 900px;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto auto auto 40px;
  }

  .footer {
    grid-column: 1 / 1;
    grid-row: 4 / 5;
    background: white
      url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='5' height='8'%3E%3Cline x1='0' y1='0' x2='5' y2='0' stroke='grey' stroke-width='1'/%3E%3C/svg%3E")
      repeat bottom right;
    padding: 0 20px;
    border: 1px solid black;
    border-top: 1px solid grey;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .about {
    box-sizing: border-box;
    position: absolute;
    right: 1px;
    background-color: white;
  }

  .about > button {
    padding: 5px 30px;
    min-height: 38px;
    border: none;
    color: grey;
  }

  .about > button:hover {
    color: white;
  }

  .footer-info {
    background-color: white;
    padding: 5px 10px;
    color: grey;
  }

  @media (min-width: 500px) {
    .panel {
      width: calc(100% - 40px);
      height: auto;
    }

    .panel::before {
      content: "";
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      top: 0;
      background: #f3f2f1
        url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='3' height='3'%3E%3Ccircle cx='2.5' cy='2.5' r='.5' fill='%2b2b2b49'/%3E%3C/svg%3E")
        repeat bottom right;
      transform: translate(9px, 9px);
      z-index: -1;
    }
  }
</style>
