<div>
  <slot />
</div>

<style>
  div {
    position: relative;
    margin: 0 auto;
    max-width: 900px;
    z-index: 1;
    width: 100%;
    height: 100%;
    display: grid;
    grid-template-columns: 100%;
    grid-template-rows: auto 1fr auto;
  }

  @media (min-width: 500px) {
    div {
      width: calc(100% - 40px);
      /*            min-height: 75vh;*/
      height: auto;
    }

    div::before {
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
