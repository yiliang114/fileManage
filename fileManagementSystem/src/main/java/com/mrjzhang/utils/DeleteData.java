/*
 * Copyright (c) 2018. Lorem ipsum dolor sit amet, consectetur adipiscing elit.
 * Morbi non lorem porttitor neque feugiat blandit. Ut vitae ipsum eget quam lacinia accumsan.
 * Etiam sed turpis ac ipsum condimentum fringilla. Maecenas magna.
 * Proin dapibus sapien vel ante. Aliquam erat volutpat. Pellentesque sagittis ligula eget metus.
 * Vestibulum commodo. Ut rhoncus gravida arcu.
 */

package com.mrjzhang.utils;

import com.mrjzhang.service.ElementService;
import org.springframework.beans.factory.annotation.Autowired;

public class DeleteData {
    @Autowired
    private ElementService elementService;

    public boolean deleteById(int id) {
        System.out.println("开始删除");
        return elementService.deleteElement(id);
    }
}
