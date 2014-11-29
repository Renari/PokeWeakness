// ==UserScript==
// @name            PokeWeakness
// @author          Renari
// @namespace       http://arimil.com
// @description     Adds weaknesses to Pokemon Showdown tooltips.
// @license         Creative Commons Attribution License
// @version         0.2.4
// @include         http://play.pokemonshowdown.com/*
// @require         http://ajax.googleapis.com/ajax/libs/jquery/2.1.1/jquery.min.js
// ==/UserScript==
function normal()
{
    this.weakness = ['Fighting'];
    this.strength = [];
    this.immune = ['Ghost'];
}
function fire()
{
    this.weakness = ['Water', 'Rock'];
    this.strength = ['Fire', 'Grass', 'Ice', 'Bug'];
    this.immune = [];
}
function water()
{
    this.weakness = ['Electric', 'Grass'];
    this.strength = ['Fire', 'Water', 'Ice', 'Steel'];
    this.immune = [];
}
function electric()
{
    this.weakness = ['Ground'];
    this.strength = ['Electric', 'Flying', 'Steel'];
    this.immune = [];
}
function grass()
{
    this.weakness = ['Fire', 'Ice', 'Poison', 'Flying', 'Bug'];
    this.strength = ['Water', 'Electric', 'Grass', 'Ground'];
    this.immune = [];
}
function ice()
{
    this.weakness = ['Fire', 'Fighting', 'Rock', 'Steel'];
    this.strength = ['Ice'];
    this.immune = [];
}
function fighting()
{
    this.weakness = ['Flying', 'Psychic'];
    this.strength = ['Bug', 'Rock'];
    this.immune = [];
}
function poison()
{
    this.weakness = ['Ground', 'Psychic'];
    this.strength = ['Grass', 'Fighting', 'Poison', 'Bug', 'Fairy'];
    this.immune = [];
}
function ground()
{
    this.weakness = ['Water', 'Grass', 'Ice'];
    this.strength = ['Poison', 'Rock'];
    this.immune = ['Electric'];
}
function flying()
{
    this.weakness = ['Electric', 'Ice', 'Rock'];
    this.strength = ['Grass', 'Fighting', 'Bug'];
    this.immune = ['Ground'];
}
function psychic()
{
    this.weakness = ['Bug', 'Ghost', 'Dark'];
    this.strength = ['Fighting', 'Psychic'];
    this.immune = [];
}
function bug()
{
    this.weakness = ['Fire', 'Flying', 'Rock'];
    this.strength = ['Grass', 'Fighting', 'Ground'];
    this.immune = [];
}
function rock()
{
    this.weakness = ['Water', 'Grass', 'Fighting', 'Ground'];
    this.strength = ['Normal', 'Fire', 'Poison', 'Flying'];
    this.immune = [];
}
function ghost()
{
    this.weakness = ['Ghost', 'Dark'];
    this.strength = ['Poison', 'Bug'];
    this.immune = ['Normal', 'Fighting'];
}
function dragon()
{
    this.weakness = ['Ice', 'Dragon', 'Fairy'];
    this.strength = ['Fire', 'Water', 'Electric', 'Grass'];
    this.immune = [];
}
function dark()
{
    this.weakness = ['Fighting', 'Bug', 'Fairy'];
    this.strength = ['Ghost', 'Dark'];
    this.immune = ['Psychic'];
}
function steel()
{
    this.weakness = ['Fire', 'Ice', 'Ground'];
    this.strength = ['Normal', 'Grass', 'Ice', 'Flying', 'Psychic', 'Bug', 'Rock', 'Dragon', 'Steel', 'Fairy'];
    this.immune = ['Poison'];
}
function fairy()
{
    this.weakness = ['Poison', 'Steel'];
    this.strength = ['Fighting', 'Bug', 'Steel'];
    this.immune = ['Dragon'];
}
MutationObserver = window.MutationObserver || window.WebKitMutationObserver;

function weakness()
{
    this.attributes = [];
    this.weaknesses = [];
    this.add = function(weak){
        //check if this weakness was already added
        if(this.weaknesses.indexOf(weak) == -1)
            this.weaknesses.push(weak);
    };
    this.remove = function(r){
        var index = this.weaknesses.indexOf(r);
        if(index != -1)
        {
            this.weaknesses.splice(index, 1);
        }
    };
    this.setAttributes = function(attr){
        this.attributes.push(attr);
    };
    this.getAttributes = function(){return this.attributes;};
    this.getWeaknesses = function(){return this.weaknesses;};
}

function outputWeaknesses()
{
    var weak = new weakness;
    console.log("PokeWeakness: Grabbing Attributes");
    var matches = $('.tooltip').find('h2').find('img');
    $('.tooltip').find('h2').find('img').each(function(index, match) {
        console.log(match);
        var atr = $(match).attr("alt");
        addWeaknessByName(weak, atr);
    });
    //add the images
    $('.tooltip').find('h2').append('<br>');
    var weaknesses = calculateWeaknesses(weak).getWeaknesses();
    for(i = 0; i < weaknesses.length; i++)
    {
        var imgstring = "//play.pokemonshowdown.com/sprites/types/"+weaknesses[i]+".png";
        imgstring = '<img src="'+imgstring+'" alt="'+weaknesses[i]+'" height="14" width="32"';
        if (i > 0)
        {
            imgstring += ' class="b"';
        }
        imgstring += '>';
        $('.tooltip').find('h2').append(imgstring);
    }
}

function addWeaknessByName(weak, atr)
{
    switch (atr)
    {
        case "Normal":
            weak.setAttributes(new normal);
            break;
        case "Fire":
            weak.setAttributes(new fire);
            break;
        case "Water":
            weak.setAttributes(new water);
            break;
        case "Electric":
            weak.setAttributes(new electric);
            break;
        case "Grass":
            weak.setAttributes(new grass);
            break;
        case "Ice":
            weak.setAttributes(new ice);
            break;
        case "Fighting":
            weak.setAttributes(new fighting);
            break;
        case "Poison":
            weak.setAttributes(new poison);
            break;
        case "Ground":
            weak.setAttributes(new ground);
            break;
        case "Flying":
            weak.setAttributes(new flying);
            break;
        case "Psychic":
            weak.setAttributes(new psychic);
            break;
        case "Bug":
            weak.setAttributes(new bug);
            break;
        case "Rock":
            weak.setAttributes(new rock);
            break;
        case "Ghost":
            weak.setAttributes(new ghost);
            break;
        case "Dragon":
            weak.setAttributes(new dragon);
            break;
        case "Dark":
            weak.setAttributes(new dark);
            break;
        case "Steel":
            weak.setAttributes(new steel);
            break;
        case "Fairy":
            weak.setAttributes(new fairy);
            break;
        default:
            cosnole.log("Unknown Type: " + atr);
            break;
    }
}

function calculateWeaknesses(weak)
{
    console.log("PokeWeakness: Adding all weaknesses");
    var types = weak.getAttributes();
    //add all weaknesses for all types
    for(i = 0; i < types.length; i++)
    {
        var weaknesses = types[i].weakness;
        for(w = 0; w < weaknesses.length; w++)
        {
            weak.add(weaknesses[w]);
        }
    }
    console.log("PokeWeakness: Removing invalid weaknesses");
    //remove all weaknesses that are a resistance of another type
    for(i = 0; i < types.length; i++)
    {
        var strengths = types[i].strength;
        for(s = 0; s < strengths.length; s++)
        {
            weak.remove(strengths[s]);
        }
    }
    console.log("PokeWeakness: Removing immunities");
    //remove all types that are an immunity
    for(i = 0; i < types.length; i++)
    {
        var immunity = types[i].immune;
        for(im = 0; im < immunity.length; im++)
        {
            weak.remove(immunity[im]);
        }
    }
    return weak;
}

function updateTeambuilder()
{
    //teambuilder weaknesses
    $('.teambuilder-results').find('.result').each(function(index, match){
        var tweak = new weakness;
        $(match).find('.typecol').find('img').each(function(i, img){
            var atr = $(img).attr('alt');
            addWeaknessByName(tweak, atr);
        });
        $(match).find('a').append('<span class="col weakcol"></span>');
        tweak = calculateWeaknesses(tweak);
        $.each(tweak.getWeaknesses(), function(i, weak){
            var imgstring = "//play.pokemonshowdown.com/sprites/types/"+weak+".png";
            imgstring = '<img src="'+imgstring+'" alt="'+weak+'" height="14" width="32">';
            $(match).find('.weakcol').append(imgstring);
        });
    });
}

$( document ).ready(function() {
    var teambuilder = false;
    var tooltipobserver;
    var tabobserver;
    var teamobserver;
    var resultobserver;
    //add the tooltip wrapper div so we don't have to watch the whole page for updates
    $('body').first().append('<div id="tooltipwrapper"></div>');
    //mutation observer for the tooltip
    tooltipobserver = new MutationObserver(function(mutation, observer) {
        outputWeaknesses();
    });
    //bind to the tooltip
    tooltipobserver.observe($('#tooltipwrapper')[0], {
        childList: true
    });
    //mutation observer to teambuilder tab
    teamobserver = new MutationObserver(function(mutation, observer) {
        //bind to the teambuilder results
    	if($('.teambuilder-results').length)
        {
            resultobserver.observe($('.teambuilder-results')[0], {
                childList: true
            });
        }
    });
    //check if teambuilder is already open
    if($('.teambuilder-clipboard-container').length)
    {
        //bind a mutationobserver to the tabs content area
        teamobserver.observe($('.teambuilder-clipboard-container').parent().parent()[0], {
            childList: true
        });
    }
    //mutation observer for results pane
    resultobserver = new MutationObserver(function(mutation, observer) {
    	updateTeambuilder();
    });
    //watch the maintab for updates
    tabobserver = new MutationObserver(function(mutation, observer) {
    	//check if teambuilder was opened
        if($('.teambuilder-clipboard-container').length)
        {
            //bind a mutationobserver to the tabs content area
            teamobserver.observe($('.teambuilder-clipboard-container').parent().parent()[0], {
                childList: true
            });
        }
    });
    tabobserver.observe($('.maintabbar')[0], {
        childList: true,
        subtree: true
    });
});
