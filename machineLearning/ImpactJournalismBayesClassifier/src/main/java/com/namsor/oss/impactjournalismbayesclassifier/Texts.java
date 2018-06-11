/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.namsor.oss.impactjournalismbayesclassifier;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;
import java.util.ArrayList;

public class Texts {

    @SerializedName("texts")
    @Expose
    private List<String> texts = null;

    public Texts(String oneText) {
        texts = new ArrayList();
        texts.add(oneText);
    }

    public List<String> getTexts() {
        return texts;
    }

    public void setTexts(List<String> texts) {
        this.texts = texts;
    }

}
