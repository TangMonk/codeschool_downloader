// download the avaliable paths in codeschool
// you can add your prefer path to `paths` variable
var req = require('request')
var cheerio = require('cheerio')
var colors = require('colors')
var fs = require('fs')
var mkdirp = require('mkdirp');

var base = "https://www.codeschool.com/"
var url = "https://www.codeschool.com/paths/"
var paths = ['ruby', 'javascript', 'html-css']

var options = {
    headers: {
        'Cookie': '"optimizelySegments=%7B%22173147641%22%3A%22false%22%2C%22173242267%22%3A%22direct%22%2C%22173095661%22%3A%22ff%22%7D; optimizelyEndUserId=oeu1402315048766r0.3409125912323725; optimizelyBuckets=%7B%7D; ajs_user_id=%22happiness.monk%40gmail.com%22; ajs_group_id=null; _sio=cb342e38-6074-4e6f-83d6-122eb49ac3a5----; km_ai=wytwyt02%40gmail.com; km_uq=; km_lv=x; _reamaze_uc=%7B%22fs%22%3A%222014-06-09T11%3A57%3A36.829Z%22%7D; __utma=19535274.470732736.1402315206.1418478516.1418525970.10; __utmz=19535274.1406591443.4.3.utmcsr=v2ex.com|utmccn=(referral)|utmcmd=referral|utmcct=/t/124980; __utma=1.1024016606.1402315206.1418478517.1418525971.10; __utmz=1.1406591443.4.3.utmcsr=v2ex.com|utmccn=(referral)|utmcmd=referral|utmcct=/t/124980; km_ni=wytwyt02%40gmail.com; mp_33adeab13a273d8765bb6f715261313e_mixpanel=%7B%22distinct_id%22%3A%20%2214775c7e5f215a-0b5d641800f3fb-41642c42-13c680-14775c7e5f370b%22%2C%22%24initial_referrer%22%3A%20%22%24direct%22%2C%22%24initial_referring_domain%22%3A%20%22%24direct%22%7D; ajs_anonymous_id=%22%22; user=%257B%2522name%2522%3A%2522wu%2520ao%2522%2C%2522username%2522%3Anull%2C%2522email%2522%3A%2522happiness.monk%40gmail.com%2522%2C%2522twitter_account%2522%3Anull%2C%2522anonymous%2522%3Afalse%2C%2522id%2522%3A%2522708ac39c-e85e-4254-b180-893ea119f420%2522%2C%2522user_subscribed%2522%3Atrue%2C%2522subscription_interval%2522%3A%2522month%2522%2C%2522subscription_plan%2522%3A%2522Individual%2520Month%2522%2C%2522subscription_team%2522%3Afalse%257D; signed_in=true; _codeschool_session=BAh7CkkiD3Nlc3Npb25faWQGOgZFVEkiJWQ4MDIxYzNlOWRjMzU3MzllZmQ3NWRhNjE1N2I0MWNkBjsAVEkiDHJlZmVyZXIGOwBGIkFodHRwczovL3d3dy5jb2Rlc2Nob29sLmNvbS9jb3Vyc2VzL3N1cnZpdmluZy1hcGlzLXdpdGgtcmFpbHNJIhl3YXJkZW4udXNlci51c2VyLmtleQY7AFRbB1sGaQN4lwxJIiIkMmEkMTAkZHhPZzJ6ZXFMNTRlN2VCeEFRU21RTwY7AFRJIh13YXJkZW4udXNlci51c2VyLnNlc3Npb24GOwBUewZJIhRsYXN0X3JlcXVlc3RfYXQGOwBUbCsHcA%2BNVEkiEF9jc3JmX3Rva2VuBjsARkkiMWxEMnJQZCtLNVNrVVJUcG83NXd6anpjK0c1b0FZMFlPNW9wUisvTzlITWM9BjsARg%3D%3D--e32eba93322037dfe3be786d47b07a88cd674710; __utmc=1; _reamaze_sc=1; reamaze_user=%257B%2522id%2522%3A%2522708ac39c-e85e-4254-b180-893ea119f420%2522%2C%2522authkey%2522%3A%2522590656ce18c9d7f79a0ae8091da573a3305205320f0cee9eeff1a163da2b62f2%2522%2C%2522name%2522%3A%2522wu%2520ao%2522%2C%2522email%2522%3A%2522happiness.monk%40gmail.com%2522%2C%2522data%2522%3A%2522%257B%255C%2522admin%255C%2522%3A%255C%2522https%3A%2F%2Fwww.codeschool.com%2Fadmin%2Fusers%2F825208%255C%2522%2C%255C%2522impersonate%255C%2522%3A%255C%2522http%3A%2F%2Fwww.codeschool.com%2Fusers%2F825208%2Fimpersonate%255C%2522%2C%255C%2522billing%255C%2522%3A%255C%2522https%3A%2F%2Fbilling.envylabs.com%2Fadmin%2Fsites%2F1%2Fcustomers%2F825208%255C%2522%2C%255C%2522stripe%255C%2522%3A%255C%2522https%3A%2F%2Fdashboard.stripe.com%2Fcustomers%2Fcus_4UMcmjuA9CjoL9%255C%2522%2C%255C%2522billing_system%255C%2522%3A%255C%2522Loot%255C%2522%2C%255C%2522subscribed%255C%2522%3Atrue%2C%255C%2522active_hall_pass%255C%2522%3Afalse%257D%2522%2C%2522custom_fields%2522%3A%2522%257B%255C%2522current_page%255C%2522%3A%257B%255C%2522type%255C%2522%3A%255C%2522hidden%255C%2522%2C%255C%2522value%255C%2522%3A%255C%2522https%3A%2F%2Fwww.codeschool.com%2Fcourses%2Ftry-ruby%2Fvideos%255C%2522%257D%2C%255C%2522referer_page%255C%2522%3A%257B%255C%2522type%255C%2522%3A%255C%2522hidden%255C%2522%2C%255C%2522value%255C%2522%3A%255C%2522https%3A%2F%2Fwww.codeschool.com%2Fcourses%2Ftry-ruby%255C%2522%257D%2C%255C%2522browser%255C%2522%3A%257B%255C%2522type%255C%2522%3A%255C%2522hidden%255C%2522%2C%255C%2522value%255C%2522%3A%255C%2522Firefox%252033%2520on%2520Mac%255C%2522%257D%2C%255C%2522browser_language%255C%2522%3A%257B%255C%2522type%255C%2522%3A%255C%2522hidden%255C%2522%2C%255C%2522value%255C%2522%3A%255C%2522en-us%2520%255C%255Cu0026%2520en%255C%2522%257D%2C%255C%2522path%255C%2522%3A%257B%255C%2522type%255C%2522%3A%255C%2522dropdown%255C%2522%2C%255C%2522value%255C%2522%3A%5B%255C%2522Electives%255C%2522%2C%255C%2522Git%255C%2522%2C%255C%2522HTML%2FCSS%255C%2522%2C%255C%2522iOS%255C%2522%2C%255C%2522JavaScript%255C%2522%2C%255C%2522Ruby%255C%2522%5D%2C%255C%2522placeholder%255C%2522%3A%255C%2522Need%2520help%2520with%2520a%2520specific%2520course%2520Path%3F%255C%2522%257D%257D%2522%257D; courses=%5B-1%5D; __utmc=19535274; kvcd=1418530678821; _reamaze_fp=account%3Dcodeschool%26app_domain%3Dreamaze.com%26protocol%3Dhttps%253A%252F%252F%26ui%255Bpopup%255D%255BzIndex%255D%3D%26ui%255Bpopup%255D%255Bwidth%255D%3D%26ui%255Bpopup%255D%255Bheight%255D%3D%26ui%255Bpopup%255D%255Btrigger%255D%3D%2523talk%26ui%255Bpopup%255D%255Bcategory%255D%3D%26ui%255Bpopup%255D%255Bmode%255D%3D%26ui%255Bembed%255D%255Bcontainer%255D%3D%2523knowledge-base%26ui%255Bembed%255D%255Bmode%255D%3D%26ui%255Bbar%255D%3Dfalse%26ui%255Bwidget%255D%3Dfalse; __utmb=19535274.45.10.1418525970; __utmb=1.44.10.1418525971; km_vs=1"'
    }
}
paths.forEach(function(path) {
    mkdirp.sync('./downloads/' + path);
    options.url = url + path;

    req(options, function(e, res, body) {
        if (e) {
            console.log(e);
            return;
        }

        console.log('Path:'.green, options.url.green)
        var $ = cheerio.load(body)
        $('.course-title-link').each(function() {
            var courseName = $(this).attr('href').substring('/courses/'.length);
            console.log(courseName)
            var coursePath = base + $(this).attr('href') + '/videos'
            console.log('Load:'.green, coursePath.green)

            options.url = coursePath;
            req(options, function(e, res, body) {
                var $ = cheerio.load(body)

                mkdirp('./downloads/' + path + '/' + courseName, function(e) {
                    if (e) console.log(e);

                    $('source[data-quality="hd"]').each(function() {
                        fs.appendFile('./downloads/' + path + '/' + courseName + '/videos.txt', $(this).attr('src') + '\n', function(err) {
                            if (err) console.log(err);
                        })
                    })
                })
            })
        });

    })
})