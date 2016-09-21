package com.jamesonnetworks.blog;

import com.google.gson.Gson;
import com.jamesonnetworks.blog.domain.entry.Entry;
import com.jamesonnetworks.blog.domain.entry.EntryComporator;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.core.io.Resource;
import org.springframework.core.io.support.PathMatchingResourcePatternResolver;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.util.ArrayList;

/**
 * Created by bjameson on 9/21/16.
 */
public class Util {

    private static final Logger log = LoggerFactory.getLogger(Util.class);

    public static ArrayList<Entry> getEntries() {

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

}
