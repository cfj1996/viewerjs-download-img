window.onload = function () {
  const { ViewerdownloadimgSbwl } = window;
  const console = window.console || { log() {} };
  const pictures = document.querySelector('.docs-pictures');
  const toggles = document.querySelector('.docs-toggles');
  const buttons = document.querySelector('.docs-buttons');
  const options = {
    // inline: true,
    url: 'data-original',
    download(uri) {
      alert(uri);
    },

    ready(e) {
      console.log(e.type);
    },
    show(e) {
      console.log(e.type);
    },
    shown(e) {
      console.log(e.type);
    },
    hide(e) {
      console.log(e.type);
    },
    hidden(e) {
      console.log(e.type);
    },
    view(e) {
      console.log(e.type);
    },
    viewed(e) {
      console.log(e.type);
    },
    zoom(e) {
      console.log(e.type);
    },
    zoomed(e) {
      console.log(e.type);
    },
    play(e) {
      console.log(e.type);
    },
    stop(e) {
      console.log(e.type);
    },
  };
  let viewer = new ViewerdownloadimgSbwl(pictures, options);

  function toggleButtons(mode) {
    let targets;
    let target;
    let length;
    let i;

    if (/modal|inline|none/.test(mode)) {
      targets = buttons.querySelectorAll('button[data-enable]');

      for (i = 0, length = targets.length; i < length; i++) {
        target = targets[i];
        target.disabled = true;

        if (String(target.getAttribute('data-enable')).indexOf(mode) > -1) {
          target.disabled = false;
        }
      }
    }
  }

  function addEventListener(element, type, handler) {
    if (element.addEventListener) {
      element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
      element.attachEvent(`on${type}`, handler);
    }
  }

  toggleButtons(options.inline ? 'inline' : 'modal');

  toggles.onchange = function (event) {
    const e = event || window.event;
    const input = e.target || e.srcElement;
    let name;

    if (viewer) {
      name = input.getAttribute('name');
      options[name] = name === 'inline' ? JSON.parse(input.getAttribute('data-value')) : input.checked;
      viewer.destroy();
      viewer = new ViewerdownloadimgSbwl(pictures, options);
      toggleButtons(options.inline ? 'inline' : 'modal');
    }
  };

  buttons.onclick = function (event) {
    const e = event || window.event;
    const button = e.target || e.srcElement;
    const method = button.getAttribute('data-method');
    const target = button.getAttribute('data-target');
    const args = JSON.parse(button.getAttribute('data-arguments')) || [];

    if (viewer && method) {
      if (target) {
        viewer[method](document.querySelector(target).value);
      } else {
        viewer[method](args[0], args[1]);
      }

      switch (method) {
        case 'scaleX':
        case 'scaleY':
          args[0] = -args[0];
          break;

        case 'destroy':
          viewer = null;
          toggleButtons('none');
          break;
      }
    }
  };

  $('[data-toggle="tooltip"]').tooltip();
};
