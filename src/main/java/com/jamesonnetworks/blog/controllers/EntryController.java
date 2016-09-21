package com.jamesonnetworks.blog.controllers;

import com.google.gson.Gson;
import com.jamesonnetworks.blog.Util;
import com.jamesonnetworks.blog.domain.entry.Entry;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.util.ArrayList;

/**
 * Created by bjameson on 5/29/2016.
 */
@RestController
@EnableAutoConfiguration
public class EntryController {

    private static final Logger log = LoggerFactory.getLogger(EntryController.class);
    private static String urlerize(String title) {
        return title.toLowerCase().replace(' ', '-');
    }

    @Value("${prod_url}")
    public String url;

    @RequestMapping(path="/robots.txt", method=RequestMethod.GET)
    public String getRobotsText() {
        StringBuilder sb  = new StringBuilder();
        sb.append("Sitemap: " + url + "sitemap.txt");
        return sb.toString();
    }

    @RequestMapping(path="/sitemap.txt", method=RequestMethod.GET)
    public String getSitemapText() {
        StringBuilder sb = new StringBuilder();
        ArrayList<Entry> entries = Util.getEntries();
        for(Entry entry: entries) {
            sb.append(url + "entry/" + urlerize(entry.getTitle()) + "\n");

        }
        return sb.toString();
    }

    @RequestMapping(path="/entries", method= RequestMethod.GET)
    public ArrayList<Entry> getAllEntries() {
        return Util.getEntries();
    }

    @RequestMapping(path="/entry/{title}", method=RequestMethod.GET)
    public ModelAndView view(@PathVariable String title) {
        ArrayList<Entry> entries = Util.getEntries();
        ModelAndView entryModelView = new ModelAndView("entry");
        Gson gson = new Gson();
        for(Entry entry : entries) {
            if(urlerize(entry.getTitle()).compareTo(urlerize(title)) == 0) {
                entryModelView.addObject("entry",  gson.toJson(entry));
                return entryModelView;
            }
        }
        return entryModelView;
    }

}
