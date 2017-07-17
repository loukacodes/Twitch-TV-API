var streamers = ["ESL_SC2", "OgamingSC2", "freecodecamp", "noobs2ninjas","comster404"];
var logo, name, displayName, url, status, info;
 streamers.forEach(function(streamer) {
  $.ajax({
 	type: 'GET',
	url: "https://api.twitch.tv/kraken/streams/" + streamer + "?client_id=e9k21l3f64c771ta2c2iavr4lfvjgm",
	success: function(streamData) {
  $.ajax({
	type: 'GET',
	url: "https://api.twitch.tv/kraken/channels/" + streamer + "?client_id=e9k21l3f64c771ta2c2iavr4lfvjgm",
	success: function(channelData) {
	  	logo = channelData.logo;
	  	name = channelData.name;
	  	displayName = channelData.display_name;
	  	url = channelData.url;
	  	info = channelData.status.slice(0,38) + "...";
  		if (logo === null)  logo="https://image.flaticon.com/icons/png/512/78/78373.png";

  		if (streamData.stream == null) {
 
			$("#offline").append("<a href=\""+url+
                  "\"target='_blank' class='streamer-link'><li class='streamer'><img class='streamer-logo' src=\""+logo+"\"><p class='streamer-name'>" + displayName +
                 "</p><img class='red' src='http://www.downloadclipart.net/svg/18089-glossy-red-button-svg.svg'></li></a>");

  		
  		} else if (streamData.stream == undefined) {
        	$("#offline").append("<li class='streamer'><img class='streamer-logo' src=\""+logo+"\"><p class='streamer-name'>" + streamData._links.self.slice(37) + 
                 "<span class='streamer-info'>Account does not exist</span>" +
                 "</p><img class='red' src='http://www.downloadclipart.net/svg/18089-glossy-red-button-svg.svg'></li>");
      }
    
    else {
			$("#online").append("<a href=\""+url+
                  "\"target='_blank' class='streamer-link'><li class='streamer'><img class='streamer-logo' src=\""+logo+"\"><p class='streamer-name'>" + displayName +
                 "<span class='streamer-info'>" +info+ 
                 "</span></p><img class='green' src='http://www.clker.com/cliparts/g/o/B/T/y/X/glossy-green-button.svg'></li></a>");

  		
  	}
 	  }
    }); //end of ajax
  } //end of stream function
}); //end of ajax

$(document).ready(function() {
 	// Bind click function to All button
 		$('#all-btn').click(function() {
          $('#on-btn, #off-btn').removeClass('selected');
            $(this).addClass('selected');
            $("#online").show();
		 	      $("#offline").show();
		 	      $("#all").show();
         
        });
        
        // Bind click function to Online button
        $('#on-btn').click(function() {
          $('#all-btn, #off-btn').removeClass('selected');
            $(this).addClass('selected')
          	$("#online").show();
		      	$("#offline").hide();
		      	$("#all").hide();
        });
        
        // Bind click function to Offline button
        $('#off-btn').click(function() {
          $('#on-btn, #all-btn').removeClass('selected');
            $(this).addClass('selected')
          	$("#online").hide();
		 	      $("#offline").show();
		 	      $("#all").hide();
        });
        
 })
});