# Mapping-the-Views-of-Leuven-Collection
This repository contains files used to create the Mapping Views of Leuven website. The project is based on the full KU Leuven Libraries [Views of Leuven Collection Dataset](https://github.com/KULeuvenDigitalisering), which is open data available for reuse. This repository includes a modified version of the CSV file from the complete dataset, a description for which can be found below. The repository also includes HTML, CSS and JavaScript source files used in the project. <br><br>
The Mapping Views of Leuven project lets users explore Leuven throughout the centuries by geolocalizing the images from the Views of Leuven collection onto a map. The map images from the collection are used as map backgrounds. Users can explore the images on the map by category (religious buildings, public places, university buildings, panoramic views, parks & waterways, and objects) and century (16th-20th centuries). The Mapping Views of Leuven website was created by Allison Bearly as part of her thesis project for KU Leuven’s Master in Digital Humanities. 
# The Views of Leuven Dataset
## Who can use it
The repository is designated as a free resource for digital humanities research, for scholars, students and teachers. It also is intended for creative reuse.
## Provenance
The modified dataset is based on the complete dataset in the Views of Leuven Collection Dataset repository. It holds the descriptive metadata as well as URL links to the digital viewer and the image thumbnail. The data was cleaned, transformed and refined with the OpenRefine application software.
## Technical Aspects
The CSV file contains 453 records in rows and 26 columns. While there are only 352 items in the collection, there are 453 records in this modified dataset because some items were added to multiple layers (for example a panoramic image of Sint-Pieterskerk is added to both the religious building layer and the panoramic view layer. Thus, the record needs to be duplicated, once with the Local_Uniform_Title_Category as “Religious building”, and again with the category as “Panoramic view”). For a correct download click on the [VoLmodified.csv](https://github.com/allisonbearly/Mapping-the-Views-of-Leuven-Collection/blob/master/VoLmodified.csv) and then right-click on 'Download' selecting 'Save link as'. The CSV file can also be downloaded from Zenodo. In order to correctly display the CSV file, the recommended setup for a proper display of the CSV file can be adjusted in the import popup window: 'Character set' to 'Unicode (UTF-8)', the separator option 'Comma' should be selected and the 'Column type' of Column A (Record ID) should be changed from General to 'Text'. <br> <br>
Note: <br> 
Three degree symbols (°°°) are used to separate values in multivalued cells, however, the column “Local_Uniform_Title_Category” was not allowed to be multi-valued. 
<br><br> The CSV file contains the following metadata: <br><br>

| Column | Content Type | Description | Instance |  |
|-|-|-|-|-|
| A | Record_ID | unique key = record id in original cataloging system | 9984685980101488 |  |
| B | URL_Limo | Direct link to the record in Limo, the library’s search interface | https://limo.libis.be/primo-explore/search?query=any,contains,9984685980101488&tab=all_content_tab&search_scope=ALL_CONTENT&vid=KULeuven&lang=en_US&offset=0 |  |
| C | Date_1 | The (estimated) date the original image was created https://www.loc.gov/marc/bibliographic/bd008a.html | 18uu |  |
| D | Date_2 | A second indicative date the print was created https://www.loc.gov/marc/bibliographic/bd008a.html | \\\\ |  |
| E | Note_on_Content | Description of the content of the image (Dutch) https://www.loc.gov/marc/bibliographic/bd545.html | $a Panoramisch zicht op het klooster van de dominicanen, waarbij de verschillende gebouwen zijn aangeduid en benoemd. |  |
| F | ENGContent | Description of the content of the image in English (translated from Dutch using DeepL) https://www.loc.gov/marc/bibliographic/bd545.html | $a Panoramic view of the monastery of the Dominicans, where the various buildings are indicated and named. |  |
| G | Source_of_Illustration | Reference to the source of the published illustration https://www.loc.gov/marc/bibliographic/bd580.html | $a illustration from: Edward Van Even, Louvain monumental ou Description historique et artistique de tous les édifices civils et religieux de la dite ville, Leuven, Fonteyn, 1860. |  |
| H | Main_Title | Main title of the publication https://www.loc.gov/marc/bibliographic/bd245.html | $a Le Couvent des Dominicains |  |
| I | RoundedDate | The first two numbers of the date indicated in Date_1 | 18 |  |
| J | PlaceName1 | A standardized name of the place in the image | Onze-Lieve-Vrouw-ten-Predikherenkerk |  |
| K | Lat1 | The latitude of Place Name 1 in decimal degrees | 50.87893 |  |
| L | Long1 | The longitude of Place Name 1 in decimal degrees | 4.6961 |  |
| M | Local_Uniform_Title_Category | Locally created group titles indicating the categories included (not multi-valued) | Religious buildings |  |
| N | Object | Indicates if the image is of an object (portrait, stained glass, etc) rather than a physical place | Yes / null |  |
| O | Local_Subj_Building_Type | Specific category for this project specifying the type of building | $a VoL Building type$x churches (church buildings)°°° $a VoL Building type$x monastery |  |
| P | Local_Subj_Building | Specific category for this project specifying the building name | $a VoL Building$x Leuven, Onze-Lieve-Vrouw ten Predikherenkerk |  |
| Q | Local_Subj_Street | Specific category for this project specifying the street name | $a VoL Street$x Leuven, Onze-Lieve-Vrouwstraat |  |
| R | Local_Subj_Pano | Specific category for this project specifying if the image is a panorama | $a VoL Pano$x Leuven, panorama |  |
| S | Local_Subj_Event | Specific category for this project specifying if the image is related to World War I | $a VoL Event$x Wereldoorlog I (1914-1918) |  |
| T | Creator_Name1 | Creator 1 of the image https://www.loc.gov/marc/bibliographic/bd700.html | $a Otto, Henri°°° $g Belgian painter, active 19th C.°°° $4 art°°° $3 graphic artist |  |
| U | Creator_Name 2 | Creator 2 of the image https://www.loc.gov/marc/bibliographic/bd700.html | $a de Jonge, F.B.°°° $4 art°°° $3 designer |  |
| V | Creator_Name_$a3 | Creator 3 of the image https://www.loc.gov/marc/bibliographic/bd700.html | $a Lemercier & Cie°°° $g Parisian firm of lithographic (and later photogravure) printers°°°  $4 art°°° $3 printer |  |
| W | Local_Uniform_Title_City1 | Locally created group titles indicating the city | $a Leuven |  |
| X | URL_Digital_Object | Link to the item in the Teneo viewer | http://resolver.libis.be/IE978853/representation |  |
| Y | URL_Thumbnail | Link to the item as a thumbnail image | http://resolver.libis.be/IE978853/thumbnail |  |
| Z | Physical_Original  | Indication of the physical location of the image | KU Leuven Libraries BIBC BRES TA00383 |  |
<br><br>
## Cite this dataset
When referring to or using the data repository in research publications and documentation, consider citing the dataset with its digital object identifier (DOI) that is minted in Zenodo. Citing the data repository of the Views of Leuven collection creates a mapping of attribution supporting efforts to release other datasets in the future. It also reduces the amount of "orphaned data," helping to retain source links. Cite the repository as: Bearly, Allison. (2020). Mapping the Views of Leuven Collection (KU Leuven Libraries. Views of Leuven Collection”). Zenodo. Zenodolink.
## Project Attribution
The Mapping Views of Leuven project was created by Allison Bearly as part of her thesis for KU Leuven’s [Advanced Master in Digital Humanities](https://set.kuleuven.be/onderwijs/mdh):
Allison Bearly, Mapping Digital Cultural Heritage: Exploring creative reuse of digitized materials, KU Leuven Master of Digital Humanities (2019-2020).
