/*! FeedEk jQuery RSS/ATOM Feed Plugin v3.1.1
 * https://jquery-plugins.net/FeedEk/FeedEk.html  https://github.com/enginkizil/FeedEk
 * Author : Engin KIZIL */

(function ($) {
	$.fn.FeedEk = function (opt) {
		var def = $.extend(
			{
				MaxCount: 5,
				ShowDesc: true,
				ShowPubDate: true,
				DescCharacterLimit: 0,
				TitleLinkTarget: "_blank",
				DateFormat: "",
				DateFormatLang: "en",
			},
			opt
		);

		var id = $(this).attr("id"),
			s = "",
			dt;
		$("#" + id).empty();
		if (def.FeedUrl == undefined) return;
		$("#" + id).append('<img src="loader.gif" />');
		$.ajax({
			url:
				"https://feed.jquery-plugins.net/load?url=" +
				encodeURIComponent(def.FeedUrl) +
				"&maxCount=" +
				def.MaxCount +
				"&dateCulture=" +
				def.DateFormatLang +
				"&dateFormat=" +
				def.DateFormat,
			dataType: "json",
			success: function (result) {
				$("#" + id).empty();
				if (result.data == null) return;

				$.each(result.data, function (e, itm) {
					s +=
						'<li><img src="covey.svg"/><div class="itemTitle">' +
						itm.title +
						"</div>";

					if (def.ShowPubDate) {
						dt = new Date(itm.publishDate);
						s += '<div class="itemDate">';
						if ($.trim(def.DateFormat).length > 0) {
							s += itm.publishDateFormatted;
						} else {
							s += dt.toLocaleDateString();
						}
						s += "</div>";
					}
					if (def.ShowDesc) {
						s += '<div class="itemContent">';
						if (
							def.DescCharacterLimit > 0 &&
							itm.description.length > def.DescCharacterLimit
						) {
							s +=
								itm.description.substring(
									0,
									def.DescCharacterLimit
								) + "...";
						} else {
							s += itm.description;
						}
						s += "</div><img src='earthy.svg'/></li>";
					}
				});

				$("#" + id).append(
					'<ul class="feedEkList">' +
						s +
						"</ul><div id='stay_home'><p><h2>Like and Subscribe... if you like...</h2></p><img src='stay_home.png' /></div>"
				);
			},
		});
	};
})(jQuery);
