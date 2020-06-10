$(document).ready(function () {
    $.get('topstories.atom', function (xmlDoc) {
        var stories = $('#topStories');
        //finds the number of entries 
        $(xmlDoc).find('entry').each(function () {
            var title = $(this).find('title')[0].textContent
            var updated = $(this).find('updated')[0].textContent
            var summary = $(this).find('summary')[0].textContent;
            var content = $(this).find('content')[0].textContent;
            
            //create story div tag 
            var storyDiv = $('<div>');

            //create header div tag
            var headerDiv = $('<div>');

            //create and append title as h2
            var h2 = $('<h2>');
            h2.append(title);

            //create and append time as h4
            var h4 = $('<h4>');
            h4.append(updated);

            //create summary div tag and append summary paragraph
            var sumDiv = $('<div>');
            sumDiv.append(summary);

            //create append all into hr tag
            headerDiv.append(h2);
            headerDiv.append(h4);
            headerDiv.append(sumDiv);
            headerDiv.append($('<hr>'));

            var conDiv = $('<div>');
            conDiv.append(content);


            storyDiv.append(headerDiv);
            storyDiv.append(conDiv);

            //class used to determine each story number
            storyDiv.addClass('story');

            stories.append(storyDiv);
            $('.story').accordion();

        });
    })
});