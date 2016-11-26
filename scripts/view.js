var view = document.getElementById('view');
var loader = document.querySelector('.loader');

var checkLink = function (e) {
  var link;

  if (e.target.nodeName === 'A') {
    link = e.target;
  } else if (e.target.parentNode.nodeName === 'A') {
    link = e.target.parentNode;
  }


  if (link && link.href !=='' && !link.href.endsWith('#') &&
      !link.href.startsWith('https://todoist.com/app')) {
    e.preventDefault();
    gui.Shell.openExternal(link.href);
  }
};

var redirectLink = function (winFrame) {

  var links = winFrame.document.querySelectorAll('a');

  winFrame.addEventListener('click', checkLink);
};

view.addEventListener('load', function () {
  var winFrame = this.contentWindow;

  if (winFrame.location.href === 'https://todoist.com/seeYou') {
    winFrame.location.href = 'https://todoist.com/app';
  } else {
    loader.className = 'loader hide';
  }

  winFrame.onbeforeunload = function(e) {
    loader.className = 'loader';
  };

  winFrame.popup = function (url, title, w, h) {
    nw.Window.open(url, {
      position: 'center',
      title: title,
      width: w,
      height: h
    }, function (win) {
      win.on('close', function() {
        this.hide();
        this.close(true);
        winFrame.location.href = originalHref;
      });

      return win;
    });
  redirectLink(winFrame);
});
