package com.jamesonnetworks.blog.controllers;

import org.springframework.boot.autoconfigure.web.ErrorController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * Created by bjameson on 6/6/16.
 */
@RestController
public class ErrorControllerImpl implements ErrorController {

    private static final String PATH = "/error";

    @RequestMapping(value = PATH)
    public String error() {
        return "These are not the droids you are looking for...";
    }

    @Override
    public String getErrorPath() {
        return PATH;
    }
}