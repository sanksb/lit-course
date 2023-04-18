import { css, unsafeCSS } from 'lit-element';

export const mediaQuery = 850;
export const transition = 1000;

export const navigationStyles = css`
  nav {
    background-color: var(--nav-background);
    letter-spacing: 1.6px;
    font-size: 16px;
    height: 100%;
  }

  .nav-link:hover {
    border-bottom: 1px solid #59868c;
  }

  .menu-btn {
    width: 100%;
    height: 100%;
    border: none;
    background: transparent;
    overflow: hidden;
    outline: none;
    cursor: pointer;
  }

  .menu-icon,
  .scroll-menu-icon {
    font-size: 40px !important;
    color: #716a6f;
    transition: transform ${unsafeCSS(`${transition}ms`)};
  }

  .menu-icon.no-transition,
  .scroll-menu-icon.no-transition {
    transition: none;
  }

  .menu-icon.rotate,
  .scroll-menu-icon.rotate {
    transform: rotate(180deg);
  }

  .menu-icon.rotate.rclose,
  .scroll-menu-icon.rotate.rclose {
    transform: rotate(360deg);
  }

  .nav-list {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    position: absolute;
    top: var(--header-nav-height);

    width: 100%;
    height: 0;

    margin: 0;
    padding: 0;

    background-color: rgba(255, 255, 255, 0.98);
    overflow: hidden;
    list-style: none;
    z-index: 1;
  }

  .opened {
    height: calc(100% - var(--header-nav-height));
  }

  .opened-fixed {
    position: fixed;
    top: var(--header-scroll-height);
    height: calc(100% - var(--header-scroll-height));
  }

  .closed {
    height: 0;
  }
  .nav-list.opened,
  .nav-list.opened-fixed,
  .nav-list.closed {
    transition: height ${unsafeCSS(`${transition}ms`)};
  }

  .nav-list > li {
    margin: 20px 0;
  }

  .nav-link {
    text-decoration: none;
    color: black;
    cursor: pointer;
  }

  .logo {
    height: 30px;
    margin-left: 20px;
  }

  .scroll-menu {
    position: fixed;
    top: -70px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: var(--header-scroll-height);
    width: 100%;
    background-color: var(--header-background);
    opacity: 0.98;
    transition: top 0.5s;
    z-index: 2;
  }

  .scroll-menu > .nav-list {
    margin-right: 30px;
  }

  .scroll-menu > img {
    width: 100px;
    margin-left: 20px;
  }

  .nav-link.fixed {
    color: #fff;
  }

  .scroll-menu-btn {
    margin-right: 20px;
    background-color: transparent;
    border: none;
    cursor: pointer;
  }

  .scroll-menu-btn > i {
    color: white;
  }

  .scrolltop-arrow {
    position: fixed;
    bottom: 0;
    right: 0;

    width: 50px;
    height: 50px;
    margin: 20px;
    border: none;
    border-radius: 100%;
    color: white;
    opacity: 0;
    background-color: rgba(0, 0, 0, 0.8);
    transition: opacity 0.6s;
    cursor: pointer;
  }

  @media (min-width: ${unsafeCSS(`${mediaQuery}px`)}) {
    .nav-list {
      all: unset;
      display: flex;
      flex-flow: row wrap;
      justify-content: center;
      align-items: center;
      height: 100%;
      list-style: none;
    }

    .nav-list > li {
      margin: 0 15px 0 15px;
    }

    .nav-list.opened,
    .nav-list.opened-fixed {
      transition: unset;
    }

    .nav-link {
      color: #424242;
    }

    .menu-btn,
    .scroll-menu-btn {
      display: none;
    }
  }
`;
