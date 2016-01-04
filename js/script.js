$(function() {

  chrome.storage.sync.get('betterGitterTheme', function (result) {
    $('.swap-theme[data-theme="'+ result.betterGitterTheme +'"]').closest('div').find('span').addClass('selected');
  });

  var $el = $('.swap-theme');

  $el.on('click', function() {
    var $this = $(this),
        theme = $this.attr('data-theme') || 'orangenight';
    $('span.selected').removeClass('selected');
    $this.closest('div').find('span').addClass('selected');
    chrome.storage.sync.set({'betterGitterTheme': theme}, function() {
      console.info('settings saved');
    });
  });

  $('a').on('click', function() {
    chrome.tabs.create({url: $(this).attr('href')});
    return false;
  });
});