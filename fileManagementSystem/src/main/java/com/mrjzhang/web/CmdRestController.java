package com.mrjzhang.web;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value="/cmd")
public class CmdRestController {

    @RequestMapping(value="/clientSetting", method = RequestMethod.GET)
    public boolean clientSetting() {
      System.out.println("cmd");
      return false;
    }

}
