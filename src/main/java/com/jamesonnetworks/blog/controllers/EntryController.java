package com.jamesonnetworks.blog.controllers;

import com.google.gson.Gson;
import com.jamesonnetworks.blog.domain.entry.Entry;
import com.jamesonnetworks.blog.domain.entry.EntryComporator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;

import java.io.*;
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
        ArrayList<Entry> entries = getEntries();
        for(Entry entry: entries) {
            sb.append(url + "entry/" + urlerize(entry.getTitle()) + "\n");

        }
        return sb.toString();
    }

    private ArrayList<Entry> getEntries() {
        ArrayList<InputStream> entries = new ArrayList<InputStream>();
        ArrayList<Entry> jsonEncodedEntries = new ArrayList<>();
        PathMatchingResourcePatternResolver resourcePatternResolver = new PathMatchingResourcePatternResolver();
        Resource[] folderList = null;
        try {
            folderList = resourcePatternResolver.getResources("classpath*:static/entries/*.json");
        }
        catch(Exception e) {
            log.info(e.getMessage());
        }
        for(Resource file : folderList) {
            String currentFile = file.getFilename();
            if (currentFile.compareTo("template.json") != 0) {
                try {
                    entries.add(file.getInputStream());
                } catch (Exception e) {
                    log.info(e.getMessage());
                }
            }
        }

        for(InputStream entry : entries) {
            StringBuilder sb = new StringBuilder();

            try {

                BufferedReader bufferedReader = new BufferedReader(new InputStreamReader(entry));

                String line;

                while ((line = bufferedReader.readLine()) != null) {
                    sb.append(line);
                }

                entry.close();

            } catch(Exception e) {
                log.info(e.getMessage());
            }
            Gson gson = new Gson();
            Entry entryObject = gson.fromJson(sb.toString(), Entry.class);
            jsonEncodedEntries.add(entryObject);
        }

        jsonEncodedEntries.sort(new EntryComporator());
        return jsonEncodedEntries;
    }


    @RequestMapping(path="/entries", method= RequestMethod.GET)
    public ArrayList<Entry> getAllEntries() {
        return this.getEntries();
    }

    @RequestMapping(path="/entry/{title}", method=RequestMethod.GET)
    public ModelAndView view(@PathVariable String title) {
        ArrayList<Entry> entries = this.getEntries();
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
