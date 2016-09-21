package com.jamesonnetworks.blog.controllers;

import com.google.gson.Gson;
import com.jamesonnetworks.blog.domain.entry.Entry;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import com.jamesonnetworks.blog.Util;

import java.util.ArrayList;

/**
 * Created by bjameson on 5/29/2016.
 */
@RestController
@EnableAutoConfiguration
public class IndexController {

    @Value("${prod_url}")
    public String url;

    @RequestMapping(path="/index", method=RequestMethod.GET)
    public ModelAndView view() {
        ArrayList<Entry> entries = Util.getEntries();
        ModelAndView indexModelView = new ModelAndView("index");
        Gson gson = new Gson();
        indexModelView.addObject("entries", gson.toJson(entries));
        return indexModelView;
    }

}
