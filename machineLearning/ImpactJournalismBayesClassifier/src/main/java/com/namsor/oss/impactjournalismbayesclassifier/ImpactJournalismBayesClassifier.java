/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.namsor.oss.impactjournalismbayesclassifier;

import com.google.gson.Gson;
import de.daslaboratorium.machinelearning.classifier.Classification;
import de.daslaboratorium.machinelearning.classifier.bayes.BayesClassifier;
import java.io.BufferedOutputStream;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.ObjectOutputStream;
import java.io.Writer;
import java.net.URLEncoder;
import java.nio.charset.Charset;
import java.nio.file.Files;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Objects;
import java.util.Set;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.stream.Collectors;
import java.util.stream.Stream;
import java.util.zip.GZIPOutputStream;
import org.apache.http.client.fluent.Request;
import org.apache.http.entity.ContentType;

/**
 *
 * @author elian
 */
public class ImpactJournalismBayesClassifier {
    private Set stopWords;
    public ImpactJournalismBayesClassifier() {
        stopWords= new HashSet();
        for (String stop : FR_STOPWORDS) {
            stopWords.add(stop);
        }
    }
    
    public List<String> readInput(String filePath) throws IOException {
        List<String> lines = Files.readAllLines(Paths.get(filePath), Charset.forName("UTF8"));
        return lines;
    }

    private static final String[] FR_STOPWORDS = {
        "a","à","â","abord","afin","ah","ai","aie","ainsi","allaient","allo","allô","allons","après","assez","attendu","au","aucun","aucune","aujourd","aujourd'hui","auquel","aura","auront","aussi","autre","autres","aux","auxquelles","auxquels","avaient","avais","avait","avant","avec","avoir","ayant","bah","beaucoup","bien","bigre","boum","bravo","brrr","ça","car","ce","ceci","cela","celle","celle-ci","celle-là","celles","celles-ci","celles-là","celui","celui-ci","celui-là","cent","cependant","certain","certaine","certaines","certains","certes","ces","cet","cette","ceux","ceux-ci","ceux-là","chacun","chaque","cher","chère","chères","chers","chez","chiche","chut","ci","cinq","cinquantaine","cinquante","cinquantième","cinquième","clac","clic","combien","comme","comment","compris","concernant","contre","couic","crac","dans","de","debout","dedans","dehors","delà","depuis","derrière","des","dès","désormais","desquelles","desquels","dessous","dessus","deux","deuxième","deuxièmement","devant","devers","devra","différent","différente","différentes","différents","dire","divers","diverse","diverses","dix","dix-huit","dixième","dix-neuf","dix-sept","doit","doivent","donc","dont","douze","douzième","dring","du","duquel","durant","effet","eh","elle","elle-même","elles","elles-mêmes","en","encore","entre","envers","environ","es","ès","est","et","etant","étaient","étais","était","étant","etc","été","etre","être","eu","euh","eux","eux-mêmes","excepté","façon","fais","faisaient","faisant","fait","feront","fi","flac","floc","font","gens","ha","hé","hein","hélas","hem","hep","hi","ho","holà","hop","hormis","hors","hou","houp","hue","hui","huit","huitième","hum","hurrah","il","ils","importe","je","jusqu","jusque","la","là","laquelle","las","le","lequel","les","lès","lesquelles","lesquels","leur","leurs","longtemps","lorsque","lui","lui-même","ma","maint","mais","malgré","me","même","mêmes","merci","mes","mien","mienne","miennes","miens","mille","mince","moi","moi-même","moins","mon","moyennant","na","ne","néanmoins","neuf","neuvième","ni","nombreuses","nombreux","non","nos","notre","nôtre","nôtres","nous","nous-mêmes","nul","ô","oh","ohé","olé","ollé","on","ont","onze","onzième","ore","ou","où","ouf","ouias","oust","ouste","outre","paf","pan","par","parmi","partant","particulier","particulière","particulièrement","pas","passé","pendant","personne","peu","peut","peuvent","peux","pff","pfft","pfut","pif","plein","plouf","plus","plusieurs","plutôt","pouah","pour","pourquoi","premier","première","premièrement","près","proche","psitt","puisque","qu","quand","quant","quanta","quant-à-soi","quarante","quatorze","quatre","quatre-vingt","quatrième","quatrièmement","que","quel","quelconque","quelle","quelles","quelque","quelques","quelqu'un","quels","qui","quiconque","quinze","quoi","quoique","revoici","revoilà","rien","sa","sacrebleu","sans","sapristi","sauf","se","seize","selon","sept","septième","sera","seront","ses","si","sien","sienne","siennes","siens","sinon","six","sixième","soi","soi-même","soit","soixante","son","sont","sous","stop","suis","suivant","sur","surtout","ta","tac","tant","te","té","tel","telle","tellement","telles","tels","tenant","tes","tic","tien","tienne","tiennes","tiens","toc","toi","toi-même","ton","touchant","toujours","tous","tout","toute","toutes","treize","trente","très","trois","troisième","troisièmement","trop","tsoin","tsouin","tu","un","une","unes","uns","va","vais","vas","vé","vers","via","vif","vifs","vingt","vivat","vive","vives","vlan","voici","voilà","vont","vos","votre","vôtre","vôtres","vous","vous-mêmes","vu","zut"
    };
    private static final int MAX_WORDS = 300;
    
    public List<String> topWords(List<String> content) {
        List<String> topWords = new ArrayList();
        List<Map.Entry<String, Long>> topEntries = getTopWords(MAX_WORDS, content.stream())
                .collect(Collectors.toList());
        int counter = 1;
        for (Map.Entry<String, Long> entry : topEntries) {
            //System.out.println(counter + ": " + entry.getKey() + " - " + entry.getValue());
            counter++;
            if( stopWords.contains(entry.getKey())) {
                // skip stopwords
            } else {
                topWords.add(entry.getKey());
            }
        }
        return topWords;
    }

    public static Stream<Map.Entry<String, Long>> getTopWords(final int topX, final Stream<String> words) {
        if (topX < 1) {
            throw new IllegalArgumentException("invalid value for topX: " + topX);
        }
        Objects.requireNonNull(words);
        Comparator<Map.Entry<String, Long>> comparator = Comparator.comparingLong(Map.Entry::getValue);
        return words.collect(Collectors.groupingBy(i -> i, Collectors.counting()))
                .entrySet().stream()
                .sorted(comparator.reversed())
                .limit(topX);
    }

    private BayesClassifier train(String trainingFilePath) throws FileNotFoundException, IOException {
        BayesClassifier classifier = new BayesClassifier();
        classifier.setMemoryCapacity(Integer.MAX_VALUE);
        List<String> trainingContents = readInput(trainingFilePath);
        for (String trainingContent : trainingContents) {
            String[] labelFeatures = trainingContent.split("\\|");
            String label = labelFeatures[0];
            String features = labelFeatures[1];
            List<String> topWords = topWords(Arrays.asList(features.split("\\s+")));
            classifier.learn(label, topWords);
        }
        return classifier;
    }

    private void saveModel(BayesClassifier classifier, String modelName) throws FileNotFoundException, IOException {
        Logger.getLogger(getClass().getName()).info("Save model " + modelName);
        ObjectOutputStream output = new ObjectOutputStream(new BufferedOutputStream(new GZIPOutputStream(new FileOutputStream("./" + modelName + ".model"))));
        output.writeObject(classifier);
        output.close();
        Logger.getLogger(getClass().getName()).info("DONE Save model " + modelName);
    }

    private void test(BayesClassifier classifier, String testingFilePath, Writer writer) throws FileNotFoundException, IOException, ClassNotFoundException {
        int totOk = 0;
        int totKo = 0;
        List<String> testingContents = readInput(testingFilePath);
        for (String testingContent : testingContents) {
            String[] labelFeatures = testingContent.split("\\|");
            String label = labelFeatures[0];
            String features = labelFeatures[1];
            List<String> topWords = topWords(Arrays.asList(features.split("\\s+")));

            String category = (String) classifier.classify(topWords).getCategory();
            writer.append(label + "|" + category + "|" + 1 + "\n");
            if (label.equals(category)) {
                totOk++;
            } else {
                totKo++;
            }
        }
        Logger.getLogger(getClass().getName()).info("Test DONE Result OK = " + totOk + "/" + (totOk + totKo) + " = " + (1d * totOk / (totOk + totKo)));
    }

    /**
     * @param args the command line arguments
     */
    public static void main(String[] args) {
        ImpactJournalismBayesClassifier main = new ImpactJournalismBayesClassifier();
        main.uClassifyTest();
        //main.run();
    }

    private void run() {
        FileWriter writer = null;
        try {
            writer = new FileWriter("./output.txt");
            BayesClassifier classifier = train("./data/train.txt");
            test(classifier, "./data/test.txt", writer);
            writer.close();
        } catch (Exception ex) {
            Logger.getLogger(ImpactJournalismBayesClassifier.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                writer.close();
            } catch (IOException ex) {
                Logger.getLogger(ImpactJournalismBayesClassifier.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }

    Gson gson = new Gson();
    /**
     * uClassify was trained on BondyBlog articles
     */
    private void uClassifyTest() {
        FileWriter writer = null;
        try {
            writer = new FileWriter("./uclassify.txt");
            List<String> testingContents = readInput("./data/test.txt");
            for (String testingContent : testingContents) {
                String[] labelFeatures = testingContent.split("\\|");
                String label = labelFeatures[0];
                String features = labelFeatures[1];
                Texts texts = new Texts(features);
                String jsonIn = gson.toJson(texts);
                
                String resp = Request.Post("https://api.uclassify.com/v1/namsor/impactinvesting/classify")
                        .useExpectContinue()
                        .addHeader("Authorization", "Token BnWMUMCiW5Ti")
                        .addHeader("Content-Type", "application/json")
                        .bodyByteArray(jsonIn.getBytes("UTF-8"))
                        .execute().returnContent().asString();
                UClassification[] classifs = gson.fromJson(resp, UClassification[].class);
                UClassification classif = classifs[0];
                writer.append(label+"|"+classif.getClassifResult()+"|"+classif.getSolution().getP()+"|"+classif.getNoSolution().getP()+"\n");
            }   
        } catch (Exception ex) {
            Logger.getLogger(ImpactJournalismBayesClassifier.class.getName()).log(Level.SEVERE, null, ex);
        } finally {
            try {
                writer.close();
            } catch (IOException ex) {
                Logger.getLogger(ImpactJournalismBayesClassifier.class.getName()).log(Level.SEVERE, null, ex);
            }
        }
    }
}
