// some native or jQuery app here
//This code can be done in Angular also;
//though, timelines restrict me to do jQuery solution
function GeoLocate(addressObject){
	this.key = 'AIzaSyBfyjmpu-gq_WxfE1wB1Qz-2UFm9jWspV0';
	this.address = addressObject;

	return this;
}
//This code can be made more robust by eleminating the jQuery dependency
//But for test, I am using jQuery AJAX 
GeoLocate.prototype.locate = function(callback) {
	if( typeof $ !== 'undefined' ){
		var search = '';
		for( var value in this.address){
			if( typeof this.address[value] === 'string' || typeof this.address[value] === 'string' ){
				search += '+'+this.address[value].trim();
			}
		}
		$.get('https://maps.googleapis.com/maps/api/geocode/json?address='+search+'&key='+this.key, function (data) {
			if( callback ){
				callback(data);
			}
		})
	}
};

(function($) {
	$(document).ready(function () {
		$('.radio-button').on('click', function (e) {
			var name = $(this).find('input[type="radio"]').attr('name');
			$('[name="'+name+'"]').removeAttr('checked').parent().removeClass('active');

			$(this).addClass('active');
			$(this).find('input[type="radio"]').attr({checked: 'checked'});
		})
		$('.checkbox-button').on('click', function (e) {
			if($(this).hasClass('active')){
				$(this).removeClass('active');
				$(this).find('input[type="checkbox"]').removeAttr('checked');
			} else {
				$(this).addClass('active');
				$(this).find('input[type="checkbox"]').attr({checked: 'checked'});
			}
		})

		$('#locate').on('click', function (e) {
			$('#lat').text(00)
			$('#lng').text(00)
			$('.error').hide().text('');
			e.preventDefault();
			var address = new GeoLocate({
				street: $('#street').val(),
				house: $('#house').val(),
				postalCode: $('#postalCode').val(),
				city: $('#city').val()
			})
			address.locate(function(data){
				if( data.results.length > 0 ){
					$('#lat').text(data.results[0].geometry.location.lat)
					$('#lng').text(data.results[0].geometry.location.lng)
					$('#location').modal('show')
				} else {
					$('.error').show().text('Sorry! We couldn\'t find the address on maps');
				}
			})
		})
	})
})(jQuery);
