// ==UserScript==
// @name HWM_Game_Menu*
// @author Ilovemycomp 2017, Demin 2013, LazyGreg 2008.
// @description Расширенное выпадающее меню. Убирает сылку на Рулетку и добавляет кучу быстрых сылок в Меню игры.
// @homepage https://greasyfork.org/ru/scripts/1224-hwm-adv-dd-menu
// @version 1.3.1
// @include http://*heroeswm.ru/*
// @include http://178.248.235.15/*
// @include http://*lordswm.com/*
// @exclude */rightcol.php*
// @exclude */ch_box.php*
// @exclude */chat*
// @exclude */ticker.html*
// @exclude */frames*
// @exclude */brd.php*
// ==/UserScript==
(function() {
    if (!this.GM_getValue || (this.GM_getValue.toString && this.GM_getValue.toString().indexOf("not supported")>-1)) {
        this.GM_getValue=function (key,def) {return localStorage[key] || def;};
        this.GM_setValue=function (key,value) {return localStorage[key]=value;};
        this.GM_deleteValue=function (key) {return delete localStorage[key];};}
    var pers_id = document.querySelector("li * a[href^='pl_hunter_stat.php?id=']");
        if ( pers_id ) {
    pers_id = /id=(\d+)/.exec( pers_id )[1]; // получаем ID текущего персонажа.
    
        // ЛИЧНЫЕ ССЫЛКИ.1 заменяются ссылки в меню: Чата -> "Комната..." максимум 9 шт.
    var replace_chat = false;
        // replace_chat = true; // перенести /*комментарий*/ к этой строке ( // впереди строки ) на 1 строку выше - для вкл замены чата своими ссылками.
    var map_change = document.querySelector("li * a[href='map.php']");
    
            // замена "Карта" - на Карта-> Производства.
        // if ( map_change ) { setTimeout(function() { map_change.href = 'map.php?st=sh'; }, 500) }
    
    var my_links = []; // ЗАМЕНА МЕНЮ ЧАТА1
        // ниже вставить номера ваших ссылок. макс 9 - по числу комнат чата.
        // лучше написать их на английском языке или в "транслите"
        // русские буквы должны быть (не обязательно) преобразованы в коды юникода. https://unicode-table.com/en/tools/decoder
    my_links.push('<a href="pl_info.php?id=15">Link_1</a>');
    my_links.push('<a href="pl_info.php?id=150">Link_2</a>');
    my_links.push('<a href="pl_info.php?id=1509">Link_3</a>');
    my_links.push('<a href="pl_info.php?id=5091">Link_4</a>');
    my_links.push('<a href="pl_info.php?id=091">Link_5</a>');
    my_links.push('<a href="pl_info.php?id=91">Link_6</a>');
    my_links.push('<a href="pl_info.php?id=1591">Link_7</a>');
    my_links.push('<a href="pl_info.php?id=1501">Link_8</a>');
    my_links.push('<a href="pl_info.php?id=1091">Link_9</a>');
    
    if ( location.hostname.match('lordswm') ) {
        var market_wood = 'Wood';
        var market_ore = 'Ore';
        var market_mercury = 'Mercury';
        var market_sulfur = 'Sulfur';
        var market_crystals = 'Crystals';
        var market_gems = 'Gems';
        var pers_el_transfer = 'Transfer elements';
        var pers_pl_info = 'Character';
        var pers_pl_transfers = 'Transfer log';
        var pers_pl_warlog = 'Combat log';
        var pers_pl_cardlog = 'Game log';
        var pers_friends = 'Your friends';
        var pers_ephoto_albums = 'Your photos';
        var forum_smiths = 'Smiths and Ench. services';
        var forum_smiths_id = '121';
    } else {
        var market_wood = '\u0414\u0440\u0435\u0432\u0435\u0441\u0438\u043D\u0430';
        var market_ore = '\u0420\u0443\u0434\u0430';
        var market_mercury = '\u0420\u0442\u0443\u0442\u044C';
        var market_sulfur = '\u0421\u0435\u0440\u0430';
        var market_crystals = '\u041A\u0440\u0438\u0441\u0442\u0430\u043B\u043B\u044B';
        var market_gems = '\u0421\u0430\u043C\u043E\u0446\u0432\u0435\u0442\u044B';
        var pers_el_transfer = '\u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0430 \u044D\u043B\u0435\u043C\u0435\u043D\u0442\u043E\u0432';
        var pers_pl_info = '\u043B\u0438\u0447\u043D\u0430\u044F \u0438\u043D\u0444\u0430 \u0433\u0435\u0440\u043E\u044F';
        var pers_pl_transfers = '\u043C\u043E\u0438 \u041F\u0435\u0440\u0435\u0434\u0430\u0447\u0438';
        var pers_pl_warlog = '\u043C\u043E\u0438 \u0411\u041E\u0418';
        var pers_pl_cardlog = '\u0431\u043E\u0438 \u0432 \u043A\u0430\u0440\u0442\u044B';
        var pers_pl_clans = '\u041A\u043B\u0430\u043D\u044B';
        var pers_friends = '\u0438\u0433\u0440\u043E\u0432\u044B\u0435 \u0414\u0440\u0443\u0437\u044C\u044F';
        var pers_ephoto_albums = '\u043C\u043E\u0438 \u0424\u043E\u0442\u043E\u0430\u043B\u044C\u0431\u043E\u043C\u044B';
        var forum_smiths = '\u0423\u0441\u043B\u0443\u0433\u0438 \u043A\u0443\u0437\u043D\u0435\u0446\u043E\u0432 \u0438 \u043E\u0440\u0443\u0436.';
        var forum_smiths_id = '22';
        var roulet_smiths = '\u0420\u0443\u043B\u0435\u0442\u043A\u0430';
    }
        var pers_shop = []; // Персонаж - Магазин1
    pers_shop.push('<a href="http://fr7927vq.bget.ru/dsdred/arend.htm" target="_blank"> сервис Арендатор </a>');
    pers_shop.push('<hr>');
    pers_shop.push('<a href="/shop.php?cat=ring&rent=1&"> \u0410\u0440\u0435\u043D\u0434\u0430-> \u041A\u043E\u043B\u0435\u0446</a>');
    pers_shop.push('<a href="forum_messages.php?tid=2212549"> ?арты существ наноарты</a>');
    pers_shop.push('<a href="/shop.php?cat=transport"> \u0422\u0440\u0430\u043D\u0441\u043F\u043E\u0440\u0442</a>');
    
          var pers_market = []; // Персонаж - Рынок. С таймингом - Выпадающее.1
    pers_market.push('<a href="auction.php?cat=res&sort=0&type=1">&nbsp;&nbsp;' + market_wood + '</a>');
    pers_market.push('<a href="auction.php?cat=res&sort=0&type=2">&nbsp;&nbsp;' + market_ore + '</a>');
    pers_market.push('<a href="auction.php?cat=res&sort=0&type=3">&nbsp;&nbsp;' + market_mercury + '</a>');
    pers_market.push('<a href="auction.php?cat=res&sort=0&type=4">&nbsp;&nbsp;' + market_sulfur + '</a>');
    pers_market.push('<a href="auction.php?cat=res&sort=0&type=5">&nbsp;&nbsp;' + market_crystals + '</a>');
    pers_market.push('<a href="auction.php?cat=res&sort=0&type=6">&nbsp;&nbsp;' + market_gems + '</a>');
    
        var pers_last = []; // Персонаж - Передача ресурсов
    pers_last.push('<a href="sms.php?notebook=1"> Блокнот </a>');
    pers_last.push('<a href="el_transfer.php">' + pers_el_transfer + '</a>');
    pers_last.push('<hr>');
    pers_last.push('<a href="sms_clans.php"> Клан Почта </a>');
    pers_last.push('<a href="sms_blacklist.php"> Чёрный список (ЛП) </a>');
    
        var map_last = []; // Карта
    map_last.push('<hr>');
    map_last.push('<a href="ecostat.php"> Эконом. стата</a>');
    map_last.push('<a href="object-info.php?id=165"> брилианты</a>');
    map_last.push('<a href="house_info.php?id=222"> дом demin </a>');
    map_last.push('<hr>');
    map_last.push('<a href="family.php"> ЗАГС </a>');
    map_last.push('<a href="pl_sex_change.php"> пол </a>');
    map_last.push('<a href="fam_pl_rename.php"> ник </a>');
    map_last.push('<a href="clan_registration.php"> регистрация Клана</a>');
    map_last.push('<hr>');
    map_last.push('<a href="hunter_guild.php"> ги. Охотника</a>');
    map_last.push('<a href="task_guild.php"> ги. Стражей</a>');
    map_last.push('<a href="thief_guild.php"> ги. Воров</a>');
    map_last.push('<a href="ranger_guild.php"> ги. Рейнджеров</a>');
    
          // переименование меню1
    /* var roul = document.querySelector("li * a[href='roulette.php']");
    roul.innerHTML = "<b>Гайды</b>";
    roul.href = "http://daily.heroeswm.ru"; */
    
          //  удаление меню
    /* var roul = document.querySelector("a[href='one_to_one.php']"); roul.parentNode.remove();
    var roul = document.querySelector("a[href='ranger_list.php']"); roul.parentNode.remove();
    var roul = document.querySelector("a[href='pvp_guild.php']"); roul.parentNode.remove();
    var roul = document.querySelector("a[href='frames.php?room=1']"); roul.parentNode.remove();
    var roul = document.querySelector("a[href='allroul.php']"); roul.parentNode.remove(); */
    
          // переименование меню2
    document.querySelector("li * a[href='home.php']").innerHTML = "<b>перс</b>";
    var cha = document.querySelector("li * a[href*='frames.php']"); cha.innerHTML = "<b>выйти</b>"; cha.href = "/logout.php";
    // var cha = document.querySelector("li * a[href*='roulette.php']"); cha.innerHTML = "<b>выйти</b>"; cha.href = "/logout.php";
    
          // Таверна. Создать выпадающие пункты.
    var n = document.querySelector("li * a[href='tavern.php']");
    var list = n.parentNode.parentNode.appendChild(document.createElement('ul'));
    /* var tester = list.appendChild(document.createElement('li'));
            tester.innerHTML = "<a href='logout.php'> Выйти </a>"; */
    
        var bitv_sect = []; // Битвы
    bitv_sect.push('<hr>');
    bitv_sect.push("<a href='http://daily.heroeswm.ru/n/of_lica'> персы адм-ции </a>");
    bitv_sect.push("<a href='clan_info.php?id=0'> админы </a>");
    bitv_sect.push("<a href='help.php?section=18'> пользование чатом </a>");
    bitv_sect.push("<a href='help.php?section=10'> таблицы опыта </a>");
    bitv_sect.push("<hr>");
    bitv_sect.push("<a href='http://daily.heroeswm.ru/n/clanwars'> клановые войны </a>");
    bitv_sect.push("<a href='http://heroes-guide.ru'> гайд </a>");
    bitv_sect.push("<a href='http://help.ordenmira.ru'> орден </a>");
    bitv_sect.push("<a href='http://daily.heroeswm.ru'> дэйли </a>");
    bitv_sect.push("<a href='http://daily.heroeswm.ru/bu.php'> дэйли - блоги </a>");
    bitv_sect.push("<a href='http://www.guildofheroes.ru'> ги Героев </a>");
    bitv_sect.push('<hr>')
    
          // Таверна. Дополнительные ссылки.
    function addnewlia(list,html) {
          list.appendChild(document.createElement('li')).innerHTML = html; }
    /* addnewlia(list,"<a href='logout.php'> выйти </a>");
    addnewlia(list,"<hr>"); */
    addnewlia(list,"<a href='http://daily.heroeswm.ru/n/GSaS'> сервисы </a>");
    addnewlia(list,"<a href='help.php?section=5'> правила Игры </a>");
    addnewlia(list,"<a href='forum_messages.php?tid=2212129'> локальные правила Чата </a>");
    addnewlia(list,"<a href='http://fr7927vq.bget.ru/v/60.htm'> ВСЕ правила Чата* </a>");
    addnewlia(list,"<a href='forum_messages.php?tid=903491'> если персонажа взломали </a>");
    addnewlia(list,"<hr>");
    addnewlia(list,"<a href='forum_messages.php?tid=1339581&page=645'> Квесты. Советы. </a>");
    addnewlia(list,"<a href='http://daily.heroeswm.ru/n/spravka'> справка новичку </a>");
    addnewlia(list,"<a href='http://daily.heroeswm.ru/n/Prokachka_anti_s_nulya'> анти с 0 </a>");
    addnewlia(list,"<a href='http://daily.heroeswm.ru/n/Antiumeniya'> ?анти </a>");
    addnewlia(list,"<a href='http://daily.heroeswm.ru/n/manual_po_arkomagu'> аркомаг (таверна) </a>");
    addnewlia(list,"<a href='http://www.guildofheroes.ru/masters.php'> мастера Кланов </a>");
    addnewlia(list,"<hr>");
    addnewlia(list,"<a href='restorepsw.php'> восст пас </a>");
    addnewlia(list,"<a href='http://www.lordswm.com/forum.php'> lordswm.com </a>");
    addnewlia(list,"<a href='http://www.lordswm.com/restorepsw.php'> lordswm.com вост пас </a>");
    addnewlia(list,"<hr>");
    addnewlia(list,"<a href='http://stats..ru/progress.php?id='+pers_id+'> статис. ordenmira ID</a>");
    addnewlia(list,"<a href='http://lgnd.ru/event/show/pl_id/'+pers_id+'> статис. lgnd ID</a>");
    
          var roulet_sect = []; // Рулетка
    roulet_sect.push('<hr>');
    roulet_sect.push('<a href="http://hwmbet.ru/player/'+pers_id+'"> ставки игрока +ID</a>');
    roulet_sect.push('<a href="http://stats.ordenmira.ru/progress.php?id='+pers_id+'"> статистика персонажа ID</a>');
    roulet_sect.push('<a href="http://hwm.i-virgo.com/ruletka/all"> стата рульки virgo</a>');
    roulet_sect.push('<a href="http://www.witchhammer.ru/roul"> стата рульки WH</a>');
    roulet_sect.push('<a href="http://fr7927vq.bget.ru/skr/hwm_roul.user.js"> ..на стр гвд (скрипт virgo)</a>');
    roulet_sect.push("<hr>");
    roulet_sect.push("<a href='http://fr7927vq.bget.ru/link'> сборник ссылок.Аэрендил </a>");
    roulet_sect.push('<a href="http://www.x-scripts.com/articles/s_is.php"> шо такое скрипты?</a>')
    roulet_sect.push("<a href='http://fr7927vq.bget.ru/skr'> таблица всех JS для игры </a>");
    roulet_sect.push("<hr>");
    roulet_sect.push("<a href='http://daily.heroeswm.ru/bu.php?i=oot7uil0'> JS от Gradient </a>");
    roulet_sect.push("<a href='https://greasyfork.org/ru/users/14188-elmarado'> JS от ElMarado </a>");
    roulet_sect.push("<a href='http://daily.heroeswm.ru/bu.php?i=gz549i5j'> JS от Небылица </a>");
    roulet_sect.push("<a href='http://daily.heroeswm.ru/bu.php?i=p0ku3znf'> Блог. ULTRA_XEROX </a>");
    roulet_sect.push("<a href='http://www.witchhammer.ru/viewpage.php?page_id=33'> JS / WH молот нерабоч. </a>");
    roulet_sect.push("<hr>");
    roulet_sect.push("<a href='forum_messages.php?tid=2133726'> ? по скриптам </a>");
    roulet_sect.push("<a href='forum_messages.php?tid=1290966'> помощь по компу </a>");
    roulet_sect.push("<a href='http://daily.heroeswm.ru/n/Calculators'> Сборник калькуляторов </a>");
    
        var reit_sect = []; // Рейтинг
    reit_sect.push('<hr>');
    reit_sect.push('<a href="/clan_info.php?id=823"> Клан </a>');
    reit_sect.push('<a href="/sklad_info.php?id=86&cat=0"> Склад клана </a>');
    reit_sect.push('<hr>');
    reit_sect.push('<a href="pl_info.php?id=' + pers_id + '">' + pers_pl_info + '</a>');
    reit_sect.push('<a href="pers_settings.php"> настройки игры </a>');
    reit_sect.push('<a href="pers_navlinks.php"> быстрые ссылки </a>')
    reit_sect.push('<a href="pl_clans.php">' + pers_pl_clans + '</a>');
    reit_sect.push('<hr>');
    reit_sect.push('<a href="pl_transfers.php?id=' + pers_id + '">' + pers_pl_transfers + '</a>');
    reit_sect.push('<a href="pl_warlog.php?id=' + pers_id + '">' + pers_pl_warlog + '</a>');
    reit_sect.push('<a href="pl_cardlog.php?id=' + pers_id + '">' + pers_pl_cardlog + '</a>');
    reit_sect.push('<a href="ephoto_albums.php">' + pers_ephoto_albums + '</a>');
    reit_sect.push('<a href="friends.php">' + pers_friends + '</a>');
    reit_sect.push('<hr>');
    
        var forum_sect = []; // Форум
    forum_sect.push('<a href="forum_thread.php?id=' + forum_smiths_id + '">' + forum_smiths + '</a>');
    forum_sect.push('<hr>');
    forum_sect.push('<a href="forum_thread.php?id=1"> \u043E\u0444\u0438\u0446. \u043E\u0431\u044A\u044F\u0432\u043B\u0435\u043D\u0438\u044F</a>');
    forum_sect.push('<a href="forum_thread.php?id=2"> \u043E\u0431\u0449\u0435-\u0438\u0433\u0440\u043E\u0432\u043E\u0439</a>');
    forum_sect.push('<a href="forum_thread.php?id=11"> \u0412\u041D\u0415\u0438\u0433\u0440\u043E\u0432\u043E\u0439</a>');
    forum_sect.push('<hr>');
    forum_sect.push('<a href="forum_thread.php?id=28"> \u0420\u0430\u0434\u0438\u043E \u0413\u0412\u0414</a>');
    forum_sect.push('<a href="forum_thread.php?id=3"> \u0418\u0434\u0435\u0438 \u0438 \u043F\u0440\u0435\u0434\u043B\u043E\u0436\u0435\u043D\u0438\u044F</a>');
    forum_sect.push('<a href="forum_thread.php?id=16"> \u0422\u0432\u043E\u0440\u0447\u0435\u0441\u0442\u0432\u043E</a>');
    forum_sect.push('<hr>');
    forum_sect.push('<a href="forum_thread.php?id=7"> \u0422\u0435\u0445\u043D\u0438\u0447\u0435\u0441\u043A\u0430\u044F \u043F\u043E\u0434\u0434\u0435\u0440\u0436\u043A\u0430</a>');
    forum_sect.push('<a href="forum_thread.php?id=8"> \u041E\u0448\u0438\u0431\u043A\u0438 \u0438 \u0441\u0431\u043E\u0438</a>');
    forum_sect.push('<a href="forum_thread.php?id=9"> \u041F\u0440\u043E\u0431\u043B\u0435\u043C\u044B \u0441 \u0431\u043E\u044F\u043C\u0438</a>');
    forum_sect.push('<hr>');
    forum_sect.push('<a href="forum_thread.php?id=13"> \u041F\u0417: \u0444\u0438\u043D\u0430\u043D\u0441\u044B \u0438 \u043F\u0440\u043E\u0447\u0435\u0435</a>');
    forum_sect.push('<a href="forum_thread.php?id=25"> \u041F\u0417: \u0431\u043E\u0438 \u0438 \u0442\u0430\u0432\u0435\u0440\u043D\u0430</a>');
    
            var all_li_subnav, elm, par, next_elm, timer;
    
        all_li_subnav = document.querySelector("li * a[href='auction.php']"); // Персонаж - Рынок
    if ( all_li_subnav ) {
    addEvent( all_li_subnav, "mouseover", function() { if ( timer != false ) timer = setTimeout(function() {
    timer = false;
    all_li_subnav = document.querySelector("li * a[href='auction.php']");
    par = all_li_subnav.parentNode;
    next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<pers_market.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = pers_market[i]; par.insertBefore(elm, next_elm); } }, 500); } );
    addEvent( all_li_subnav, "mouseout", function() { if ( timer ) clearTimeout(timer); } ); }
        all_li_subnav = document.querySelector("li * a[href='shop.php']"); // Персонаж - Магазин. pers_shop
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<pers_shop.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = pers_shop[i]; par.insertBefore(elm, next_elm);} }
        all_li_subnav = document.querySelector("li * a[href='transfer.php']"); // Персонаж - Последнее. pers_last
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<pers_last.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = pers_last[i]; par.insertBefore(elm, next_elm);} }
        all_li_subnav = document.querySelector("li * a[href^='map.php?'][href*='st=hs']"); // Карта - Последнее
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<map_last.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = map_last[i]; par.insertBefore(elm, next_elm);} }
        all_li_subnav = document.querySelector("li * a[href='forum.php#t1']"); // Форум. forum_sect
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<forum_sect.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = forum_sect[i]; par.insertBefore(elm, next_elm);} }
        all_li_subnav = document.querySelector("li * a[href='gift_box_log.php']"); // Рулетка. roulet_sect
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<roulet_sect.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = roulet_sect[i]; par.insertBefore(elm, next_elm);} }
        all_li_subnav = document.querySelector("li * a[href='plstats_merc.php']"); // Рейтинг. reit_sect
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<reit_sect.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = reit_sect[i]; par.insertBefore(elm, next_elm);} }
        all_li_subnav = document.querySelector("li * a[href='tournaments.php']"); // Битвы. bitv_sect
    if ( all_li_subnav ) { par = all_li_subnav.parentNode; next_elm = all_li_subnav.nextSibling;
    for ( var i=0; i<bitv_sect.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = bitv_sect[i]; par.insertBefore(elm, next_elm);} }
        if ( replace_chat && my_links.length>0 ) { // замена Чат-меню. my_links
    all_li_subnav = document.querySelector("li * a[href='frames.php']");
    if ( all_li_subnav ) {
        all_li_subnav.parentNode.innerHTML = '<font color="f5c137">&nbsp;<b>Links</b>&nbsp;</font>';
            all_li_subnav = document.querySelectorAll("li * a[href^='frames.php']");
    for ( var i=1; i<all_li_subnav.length; i++ ) { par = all_li_subnav[i].parentNode; par.parentNode.removeChild(par); }
    var remove_par = all_li_subnav[0].parentNode; par = remove_par.parentNode; next_elm = remove_par.nextSibling;
    for ( var i=0; i<my_links.length; i++ ) { elm = document.createElement('li'); elm.innerHTML = my_links[i]; par.insertBefore(elm, next_elm); }
    remove_par.parentNode.removeChild(remove_par); } }
        }
    function $(id) { return document.querySelector("#"+id); }
    function addEvent(elem, evType, fn) {
    if (elem.addEventListener) { elem.addEventListener(evType, fn, false); }
    else if (elem.attachEvent) { elem.attachEvent("on" + evType, fn); }
    else {elem["on" + evType] = fn;} }
    })();