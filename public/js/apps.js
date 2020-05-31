$("[data-toggle=popover]").popover({
    html: true, 
    trigger: 'hover',
    delay: 10,
	content: function() {
          return $('#popover-content').html();
        }
});
