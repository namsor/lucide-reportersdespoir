/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.namsor.oss.impactjournalismbayesclassifier;

import java.util.List;
import com.google.gson.annotations.Expose;
import com.google.gson.annotations.SerializedName;

public class UClassification {

    @SerializedName("textCoverage")
    @Expose
    private Double textCoverage;
    @SerializedName("classification")
    @Expose
    private List<Classification> classification = null;

    public class Classification {

        @SerializedName("className")
        @Expose
        private String className;
        @SerializedName("p")
        @Expose
        private Double p;

        public String getClassName() {
            return className;
        }

        public void setClassName(String className) {
            this.className = className;
        }

        public Double getP() {
            return p;
        }

        public void setP(Double p) {
            this.p = p;
        }

    }

    public Double getTextCoverage() {

        return textCoverage;
    }

    public void setTextCoverage(Double textCoverage) {
        this.textCoverage = textCoverage;
    }

    public List<Classification> getClassification() {
        return classification;
    }

    public void setClassification(List<Classification> classification) {
        this.classification = classification;
    }

    public Classification getClassification(String className) {
        for (Classification aClass : classification) {
            if(aClass.getClassName().equals(className)) {
                return aClass;
            }
        }
        return null;
    }
    
    public Classification getSolution() {
        return getClassification("solution");
    }

    public Classification getNoSolution() {
        return getClassification("no_solution");
    }
    
    public String getClassifResult() {
        if (getSolution().getP() > getNoSolution().getP()) {
            return "solution";
        } else {
            return "no_solution";
        }
    }
}
