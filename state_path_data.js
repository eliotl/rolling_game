var statesData =  [
    {id: "California",  class: "oranges", d: "M 495.833 1239.202 L 618 1238.761 L 618 1396 L 356 1396 L 355.97 909.324 L 496.099 910.314 L 495.833 1239.202 Z",
                    box_id: "California_box", box_x: 362.888, box_y: 1083.92, box_width: 80,  box_height: 80, adjusted_input_x: 368.888, adjusted_input_y: 1018.92 },
    {id: "Idaho", class: "oranges", d: "M723.888,770.719H824V918H612V504H723.888V770.719Z",  
                    box_id: "Idaho_box",  box_x: 650.888, box_y: 777.925, box_width: 80,  box_height: 80, adjusted_input_x: 656.888, adjusted_input_y: 712.925 },
    {id: "Utah",  class: "oranges", d: "M824,1012h68v228H682V910H824v102Z",  
        box_id: "Utah_box",   box_x: 718.888, box_y: 1055.92, box_width: 80,  box_height: 80, adjusted_input_x: 724.888, adjusted_input_y: 990.92 },
    { id:'Nevada', class: 'oranges', x: 495.938, y: 909.875, height: 329.965, width: 193.968,     
                    box_id: "Nevada_box",  box_x: 525.888, box_y: 1015.92, box_width: 80, box_height:  80,      
                    adjusted_input_x: 531.888,  adjusted_input_y: 950.92},
    {id: "Arizona", class: "oranges", d: "M 617.87 1240.236 L 891.834 1240.236 L 891.834 1518.777 L 617.87 1518.777 L 617.87 1240.236 Z",  
                    box_id: "Arizona_box",  box_x: 690.888, box_y: 1312.92, box_width: 80,  box_height: 80, adjusted_input_x: 696.888, adjusted_input_y: 1247.92 },
    {id: "Oregon",  class: "oranges", d: "M 355.953 691.909 L 619.835 691.909 L 619.835 910.257 L 355.953 910.257 L 355.953 691.909 Z",   
                    box_id: "Oregon_box", box_x: 420.888, box_y: 739.925, box_width: 80,  box_height: 80, adjusted_input_x: 426.888, adjusted_input_y: 674.925 },
    {id: "Washington",  class: "oranges", d: "M355.953,503.934H619.919V699.908H355.953V503.934Z",  
                    box_id: "Washington_box", box_x: 420.888, box_y: 536.925, box_width: 80,  box_height: 80, adjusted_input_x: 426.888, adjusted_input_y: 471.925 },
    {id: "Hawaii",  class: "oranges", d: "M111.987,1429.81H309.958a10,10,0,0,1,10,10v95.99a10,10,0,0,1-10,10H111.987a10,10,0,0,1-10-10v-95.99A10,10,0,0,1,111.987,1429.81Z",   
                    box_id: "Hawaii_box", box_x: 144, box_y: 1439,  box_width: 134, box_height: 99, adjusted_input_x: 150, adjusted_input_y: 1374 },
    {id: "Alaska",  class: "oranges", d: "M112.674,252.529H310.208a10,10,0,0,1,10,10v193.41a10,10,0,0,1-10,10H112.674a10,10,0,0,1-10-10V262.529A10,10,0,0,1,112.674,252.529Z", 
                    box_id: "Alaska_box", box_x: 143.888, box_y: 292.925, box_width: 80,  box_height: 80, adjusted_input_x: 149.888, adjusted_input_y: 227.925 },
    
    
    {id: "Georgia", class: "reds",  d: "M 1935.299 1342.905 L 2149.72 1342.905 L 2149.72 1565.628 L 1935.299 1565.628 L 1935.299 1342.905 Z",
                    box_id: "Georgia_box",  box_x: 1971.89, box_y: 1392.92, box_width: 134, box_height: 97, adjusted_input_x: 1977.89, adjusted_input_y: 1327.92 },
    { id:'North_Carolina', class: 'reds', x: 2042.858,    y: 1236.273,    height: 107.727, width: 353.142,     
                    box_id: "North_Carolina_box",  box_x: 2159,    box_y: 1239   , box_width: 134, box_height: 97,      
                    adjusted_input_x: 2165,     adjusted_input_y: 1174},
    { id:'South_Carolina', class: 'reds', x: 2150,    y: 1344,    height: 156, width: 160,     
                    box_id: "South_Carolina_box",  box_x: 2154.89, box_y: 1346.92, box_width: 134, box_height: 97,      
                    adjusted_input_x: 2160.89,  adjusted_input_y: 1281.92},
    {id: "Virginia",  class: "reds",  d: "M1952,1238V1125h222V1019.96h115.98V1125H2396v113H1952Z",
                    box_id: "Virginia_box",   box_x: 2182,  box_y: 1130,  box_width: 101, box_height: 100,   adjusted_input_x: 2188,  adjusted_input_y: 1065 },
    { id:'Maryland', class: 'reds', x: 2280,    y: 1020,    height: 113, width: 224,     
                    box_id: "Maryland_box",    box_x: 2327,    box_y: 1030   , box_width: 134, box_height: 94,      
                    adjusted_input_x: 2333,     adjusted_input_y: 965},
    { id:'Delaware', class: 'reds', x: 2380,    y: 914, height: 115, width: 223,     
                    box_id: "Delaware_box",    box_x: 2426,    box_y: 926, box_width: 134, box_height: 95,      
                    adjusted_input_x: 2432,     adjusted_input_y: 861},
    { id:'West_Virginia', class: 'reds', x: 1960.262,    y: 1028.948,    height: 107.052, width: 223.738,     
                    box_id: "West_Virginia_box",   box_x: 2003,    box_y: 1029   , box_width: 134, box_height: 97,      
                    adjusted_input_x: 2009,     adjusted_input_y: 964},
    { id:'Pennsylvania', class: 'reds', x: 2064,    y: 810, height: 219, width: 324,     
                    box_id: "Pennsylvania_box",    box_x: 2158.89, box_y: 853.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 2164.89,  adjusted_input_y: 788.925},
    { id:'Ohio', class: 'reds', x: 1884,    y: 810, height: 219, width: 188,     
                    box_id: "Ohio_box",    box_x: 1908.89, box_y: 853.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 1914.89,  adjusted_input_y: 788.925},
                
    {id: "Alabama", class: "yellows", d: "M1829.99,1574.55V1666h-88V1334.01H1936v240.54H1829.99Z", 
                    box_id: "Alabama_box",  box_x: 1771.89, box_y: 1392.92, box_width: 80,  box_height: 80, adjusted_input_x: 1777.89, adjusted_input_y: 1327.92 },
    {id: "Mississippi", class: "yellows", d: "M1678,1666v-53.67h-91.99V1334.01h173.98V1666H1669Z", 
                    box_id: "Mississippi_box",  box_x: 1596.89, box_y: 1392.92, box_width: 80,  box_height: 80, adjusted_input_x: 1602.89, adjusted_input_y: 1327.92 },
    {id: "Arkansas",  class: "yellows", d: "M 1454.89 1488.073 L 1454.833 1465.658 L 1411 1465.788 L 1411 1297.729 L 1585.716 1297.729 L 1585.716 1488.073 L 1454.89 1488.073 Z",
                    box_id: "Arkansas_box",   box_x: 1429.89, box_y: 1313.92, box_width: 80,  box_height: 80, adjusted_input_x: 1435.89, adjusted_input_y: 1248.92 },
    {id: "Louisiana", class: "yellows", d: "M 1455 1488 L 1585.81 1488 L 1585.81 1603.98 L 1677 1603.98 L 1677 1746 L 1455 1746 Z",  
                    box_id: "Louisiana_box",  box_x: 1462.89, box_y: 1606.92, box_width: 80,  box_height: 80, adjusted_input_x: 1468.89, adjusted_input_y: 1541.92 },
    {id: "Florida", class: "yellows", d: "M2039.73,1881.75V1665.78H1819.76V1563.79h329.96v317.96H2039.73Z",   
                    box_id: "Florida_box",  box_x: 2042,  box_y: 1567,  box_width: 90,  box_height: 132,   adjusted_input_x: 2056,  adjusted_input_y: 1510 },            
    { id:'Tennessee', class: 'yellows', x: 1586.107,    y: 1237.66, height: 106.15 , width: 457.613,     
                    box_id: "Tennessee_box",   box_x: 1733,    box_y: 1239   , box_width: 134, box_height: 96,      
                    adjusted_input_x: 1739,     adjusted_input_y: 1174},
    {id: "Kentucky",  class: "yellows", d: "M 1960 1029.186 L 1960 1238 L 1585.763 1238 L 1585.763 1132.149 L 1744.087 1132.149 L 1744.087 1029.186",
                    box_id: "Kentucky_box",   box_x: 1778.89, box_y: 1065.92, box_width: 80,  box_height: 80, adjusted_input_x: 1784.89, adjusted_input_y: 1000.92 },
    {id: "Missouri",  class: "yellows", d: "M 1410.987 1002 L 1585.99 1002 L 1585.99 1298.01 L 1410.987 1298.01 L 1410.987 1002 Z",  
                    box_id: "Missouri_box",   box_x: 1429.89, box_y: 1091.92, box_width: 80,  box_height: 80, adjusted_input_x: 1435.89, adjusted_input_y: 1026.92 },            
    
                
    { id:'Maine', class: 'purples', x: 2682,    y: 288, height: 218, width: 220,     
                    box_id: "Maine_box",   box_x: 2721,    box_y: 327, box_width: 134, box_height: 134,     
                    adjusted_input_x: 2727,     adjusted_input_y: 262},
    {id: "New_York",  class: "purples", d: "M 2140 810.06 L 2140 648.123 L 2301.98 648.123 L 2301.98 496 L 2470 496 L 2470 810.06 L 2140 810.06 Z",  
                    box_id: "New_York_box",   box_x: 2313,  box_y: 669, box_width: 134, box_height: 134,   adjusted_input_x: 2319,  adjusted_input_y: 604 },
    { id:'New_Hampshire', class: 'purples', x: 2564,    y: 394, height: 218, width: 118,     
                    box_id: "New_Hampshire_box",   box_x: 2569,    box_y: 437, box_width: 94, box_height:  134,     
                    adjusted_input_x: 2583,     adjusted_input_y: 372},
    { id:'Vermont', class: 'purples', x: 2462,    y: 394, height: 218, width: 112,     
                    box_id: "Vermont_box", box_x: 2463,    box_y: 437, box_width: 94, box_height:  134,     
                    adjusted_input_x: 2477,     adjusted_input_y: 372},
    { id:'Massachusetts', class: 'purples', x: 2462,    y: 604, height: 102, width: 325.65,     
                    box_id: "Massachusetts_box",   box_x: 2556,    box_y: 612, box_width: 134, box_height: 92,      
                    adjusted_input_x: 2562,     adjusted_input_y: 547},
    {id: "Rhode_Island",  class: "purples", d: "M 2639.65 703.907 L 2787.63 703.907 L 2787.63 809.782 L 2639.65 809.782 L 2639.65 703.907 Z",   
                    box_id: "Rhode_Island_box",   box_x: 2654,  box_y: 713, box_width: 125, box_height: 95, adjusted_input_x: 2660,  adjusted_input_y: 648 },            
    {id: "Connecticut", class: "purples", d: "M 2461.964 703.907 L 2651.65 703.907 L 2651.65 809.782 L 2461.964 809.782 L 2461.964 703.907 Z ",
                    box_id: "Connecticut_box",  box_x: 2489,  box_y: 713, box_width: 134, box_height: 95, adjusted_input_x: 2495,  adjusted_input_y: 648 },
    { id:'New_Jersey', class: 'purples', x: 2388,    y: 810, height: 116, width: 215.501,     
                    box_id: "New_Jersey_box",  box_x: 2426,    box_y: 820, box_width: 134, box_height: 95,      
                    adjusted_input_x: 2432,     adjusted_input_y: 755},
    
    {id: "Nebraska",  class: "greens",  d: "M 1166.174 1069.519 L 1165.594 1012.803 L 1122.618 1011.958 L 1122.455 897.882 L 1411.81 897.627 L 1411.81 1069.264 L 1166.174 1069.519 Z", 
                    box_id: "Nebraska_box",   box_x: 1211.89, box_y: 919.925, box_width: 80,  box_height: 80, adjusted_input_x: 1217.89, adjusted_input_y: 854.925 },
    {id: "Texas", class: "greens",  d: "M 1332.097 1745.77 L 1332.097 1845.76 L 1158.344 1845.76 L 1158.344 1632.79 L 1013.87 1632.79 L 1013.87 1517.8 L 1111.481 1517.8 L 1111.481 1319.83 L 1220.817 1319.83 L 1220.817 1465.81 L 1455.101 1465.81 L 1455.101 1745.77 L 1332.097 1745.77 Z",
                    box_id: "Texas_box",  box_x: 1217.89, box_y: 1537.92, box_width: 80,  box_height: 80, adjusted_input_x: 1223.89, adjusted_input_y: 1472.92 },
    {id: "Kansas",  class: "greens",  d: "M1157.85,1069.86h253.96v169.98H1157.85V1069.86Z",   
                    box_id: "Kansas_box", box_x: 1221.89, box_y: 1091.92, box_width: 80,  box_height: 80, adjusted_input_x: 1227.89, adjusted_input_y: 1026.92 },
    {id: "New_Mexico",  class: "greens",  d: "M 891.699 1239.466 L 1121.85 1239.466 L 1121.85 1517.8 L 891.699 1517.8 L 891.699 1239.466 Z",   
                    box_id: "New_Mexico_box", box_x: 935.888, box_y: 1312.92, box_width: 80,  box_height: 80, adjusted_input_x: 941.888, adjusted_input_y: 1247.92 },
    {id: "Oklahoma",  class: "greens",  d: "M 1218.223 1465.81 L 1218.223 1319.83 L 1121.816 1319.69 L 1122.303 1239.842 L 1411.367 1240.159 L 1410.903 1465.81 L 1218.223 1465.81 Z", 
                    box_id: "Oklahoma_box",   box_x: 1248.89, box_y: 1280.92, box_width: 80,  box_height: 80, adjusted_input_x: 1254.89, adjusted_input_y: 1215.92 },
    {id: "Colorado",  class: "greens",  d: "M 891.986 1011.911 L 1165.85 1011.911 L 1165.85 1239.84 L 891.986 1239.84 L 891.986 1011.911 Z",
                    box_id: "Colorado_box",   box_x: 957.888, box_y: 1063.92, box_width: 80,  box_height: 80, adjusted_input_x: 963.888, adjusted_input_y: 998.92 },
    { id:'Wyoming', class: 'greens', x: 823.604, y: 771, height: 240.893, width: 298.626,     
                    box_id: "Wyoming_box", box_x: 899.888, box_y: 831.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 905.888,  adjusted_input_y: 766.925},
    
    { id:'Indiana', class: 'blues', x: 1736,    y: 810, height: 219, width: 158,     
                    box_id: "Indiana_box", box_x: 1746.84, box_y: 852.9  , box_width: 80, box_height:  80,      
                    adjusted_input_x: 1752.84,  adjusted_input_y: 787.9},
    {id: "Michigan",  class: "blues", d: "M 1743.944 554 L 1952 554 L 1952 809.695 L 1829.835 809.695 L 1829.835 668.463 L 1743.944 668.463 Z",   
                    box_id: "Michigan_box",   box_x: 1835, box_y: 653.906, box_width: 80,  box_height: 80, adjusted_input_x: 1837.84, adjusted_input_y: 588.906 },
    { id:'Wisconsin', class: 'blues', x: 1585.51, y: 554, height: 256.304, width: 158.491,     
                    box_id: "Wisconsin_box",   box_x: 1593.84, box_y: 592.9  , box_width: 80, box_height:  80,      
                    adjusted_input_x: 1599.84,  adjusted_input_y: 527.9},
    { id:'Illinois', class: 'blues', x: 1585.899,    y: 810, height: 326, width: 158.101,     
                    box_id: "Illinois_box",    box_x: 1593.84, box_y: 897.9  , box_width: 80, box_height:  80,      
                    adjusted_input_x: 1599.84,  adjusted_input_y: 832.9},
    {id: "Iowa",  class: "blues", d: "M 1411.758 769.9 L 1585.79 769.9 L 1585.79 1011.87 L 1411.758 1011.87 L 1411.758 769.9 Z",   
                    box_id: "Iowa_box",   box_x: 1426.84, box_y: 831.9, box_width: 80,  box_height: 80, adjusted_input_x: 1432.84, adjusted_input_y: 766.9 },
    {id: "Minnesota", class: "blues", d: "M1404.01,504H1586V782H1404.01V504Z", 
                    box_id: "Minnesota_box",  box_x: 1429.84, box_y: 573.9, box_width: 80,  box_height: 80, adjusted_input_x: 1435.84, adjusted_input_y: 508.9 },
    {id: "South_Dakota",  class: "blues", d: "M 1120.659 705.907 L 1411.81 705.907 L 1411.81 897.693 L 1120.659 897.693 L 1120.659 705.907 Z", 
                    box_id: "South_Dakota_square_box",  box_x: 1195.84, box_y: 739.9, box_width: 80,  box_height: 80, adjusted_input_x: 1201.84, adjusted_input_y: 674.9 },
    {id: "North_Dakota",  class: "blues", d: "M 1121.653 504 L 1412.01 504 L 1412.01 716.464 L 1121.653 716.464 L 1121.653 504 Z", 
                    box_id: "North_Dakota_square_box",  box_x: 1195.84, box_y: 543.929, box_width: 80,  box_height: 80, adjusted_input_x: 1201.84, adjusted_input_y: 478.929 },
    { id:'Montana', class: 'blues', x: 722.398, y: 504, height: 268.821, width: 399.602,     
                    box_id: "Montana_box", box_x: 853.888, box_y: 573.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 859.888,  adjusted_input_y: 508.925}]



var statesData_ =  {
    California: {id: "California",  class: "oranges", d: "M 495.833 1239.202 L 618 1238.761 L 618 1396 L 356 1396 L 355.97 909.324 L 496.099 910.314 L 495.833 1239.202 Z",
                    box_id: "California_box", box_x: 362.888, box_y: 1083.92, box_width: 80,  box_height: 80, adjusted_input_x: 368.888, adjusted_input_y: 1018.92 },
    Idaho: {id: "Idaho", class: "oranges", d: "M723.888,770.719H824V918H612V504H723.888V770.719Z",  
                    box_id: "Idaho_box",  box_x: 650.888, box_y: 777.925, box_width: 80,  box_height: 80, adjusted_input_x: 656.888, adjusted_input_y: 712.925 },
    Utah: {id: "Utah",  class: "oranges", d: "M824,1012h68v228H682V910H824v102Z",  
        box_id: "Utah_box",   box_x: 718.888, box_y: 1055.92, box_width: 80,  box_height: 80, adjusted_input_x: 724.888, adjusted_input_y: 990.92 },
    Nevada: { id:'Nevada', class: 'oranges', x: 495.938, y: 909.875, height: 329.965, width: 193.968,     
                    box_id: "Nevada_box",  box_x: 525.888, box_y: 1015.92, box_width: 80, box_height:  80,      
                    adjusted_input_x: 531.888,  adjusted_input_y: 950.92},
    Arizona: {id: "Arizona", class: "oranges", d: "M 617.87 1240.236 L 891.834 1240.236 L 891.834 1518.777 L 617.87 1518.777 L 617.87 1240.236 Z",  
                    box_id: "Arizona_box",  box_x: 690.888, box_y: 1312.92, box_width: 80,  box_height: 80, adjusted_input_x: 696.888, adjusted_input_y: 1247.92 },
    Oregon: {id: "Oregon",  class: "oranges", d: "M 355.953 691.909 L 619.835 691.909 L 619.835 910.257 L 355.953 910.257 L 355.953 691.909 Z",   
                    box_id: "Oregon_box", box_x: 420.888, box_y: 739.925, box_width: 80,  box_height: 80, adjusted_input_x: 426.888, adjusted_input_y: 674.925 },
    Washington: {id: "Washington",  class: "oranges", d: "M355.953,503.934H619.919V699.908H355.953V503.934Z",  
                    box_id: "Washington_box", box_x: 420.888, box_y: 536.925, box_width: 80,  box_height: 80, adjusted_input_x: 426.888, adjusted_input_y: 471.925 },
    Hawaii: {id: "Hawaii",  class: "oranges", d: "M111.987,1429.81H309.958a10,10,0,0,1,10,10v95.99a10,10,0,0,1-10,10H111.987a10,10,0,0,1-10-10v-95.99A10,10,0,0,1,111.987,1429.81Z",   
                    box_id: "Hawaii_box", box_x: 144, box_y: 1439,  box_width: 134, box_height: 99, adjusted_input_x: 150, adjusted_input_y: 1374 },
    Alaska: {id: "Alaska",  class: "oranges", d: "M112.674,252.529H310.208a10,10,0,0,1,10,10v193.41a10,10,0,0,1-10,10H112.674a10,10,0,0,1-10-10V262.529A10,10,0,0,1,112.674,252.529Z", 
                    box_id: "Alaska_box", box_x: 143.888, box_y: 292.925, box_width: 80,  box_height: 80, adjusted_input_x: 149.888, adjusted_input_y: 227.925 },
    
    
    Georgia: {id: "Georgia", class: "reds",  d: "M 1935.299 1342.905 L 2149.72 1342.905 L 2149.72 1565.628 L 1935.299 1565.628 L 1935.299 1342.905 Z",
                    box_id: "Georgia_box",  box_x: 1971.89, box_y: 1392.92, box_width: 134, box_height: 97, adjusted_input_x: 1977.89, adjusted_input_y: 1327.92 },
    North_Carolina: { id:'North_Carolina', class: 'reds', x: 2042.858,    y: 1236.273,    height: 107.727, width: 353.142,     
                    box_id: "North_Carolina_box",  box_x: 2159,    box_y: 1239   , box_width: 134, box_height: 97,      
                    adjusted_input_x: 2165,     adjusted_input_y: 1174},
    South_Carolina: { id:'South_Carolina', class: 'reds', x: 2150,    y: 1344,    height: 156, width: 160,     
                    box_id: "South_Carolina_box",  box_x: 2154.89, box_y: 1346.92, box_width: 134, box_height: 97,      
                    adjusted_input_x: 2160.89,  adjusted_input_y: 1281.92},
    Virginia: {id: "Virginia",  class: "reds",  d: "M1952,1238V1125h222V1019.96h115.98V1125H2396v113H1952Z",
                    box_id: "Virginia_box",   box_x: 2182,  box_y: 1130,  box_width: 101, box_height: 100,   adjusted_input_x: 2188,  adjusted_input_y: 1065 },
    Maryland: { id:'Maryland', class: 'reds', x: 2280,    y: 1020,    height: 113, width: 224,     
                    box_id: "Maryland_box",    box_x: 2327,    box_y: 1030   , box_width: 134, box_height: 94,      
                    adjusted_input_x: 2333,     adjusted_input_y: 965},
    Delaware: { id:'Delaware', class: 'reds', x: 2380,    y: 914, height: 115, width: 223,     
                    box_id: "Delaware_box",    box_x: 2426,    box_y: 926, box_width: 134, box_height: 95,      
                    adjusted_input_x: 2432,     adjusted_input_y: 861},
    West_Virginia: { id:'West_Virginia', class: 'reds', x: 1960.262,    y: 1028.948,    height: 107.052, width: 223.738,     
                    box_id: "West_Virginia_box",   box_x: 2003,    box_y: 1029   , box_width: 134, box_height: 97,      
                    adjusted_input_x: 2009,     adjusted_input_y: 964},
    Pennsylvania: { id:'Pennsylvania', class: 'reds', x: 2064,    y: 810, height: 219, width: 324,     
                    box_id: "Pennsylvania_box",    box_x: 2158.89, box_y: 853.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 2164.89,  adjusted_input_y: 788.925},
    Ohio: { id:'Ohio', class: 'reds', x: 1884,    y: 810, height: 219, width: 188,     
                    box_id: "Ohio_box",    box_x: 1908.89, box_y: 853.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 1914.89,  adjusted_input_y: 788.925},
                
    Alabama: {id: "Alabama", class: "yellows", d: "M1829.99,1574.55V1666h-88V1334.01H1936v240.54H1829.99Z", 
                    box_id: "Alabama_box",  box_x: 1771.89, box_y: 1392.92, box_width: 80,  box_height: 80, adjusted_input_x: 1777.89, adjusted_input_y: 1327.92 },
    Mississippi: {id: "Mississippi", class: "yellows", d: "M1678,1666v-53.67h-91.99V1334.01h173.98V1666H1669Z", 
                    box_id: "Mississippi_box",  box_x: 1596.89, box_y: 1392.92, box_width: 80,  box_height: 80, adjusted_input_x: 1602.89, adjusted_input_y: 1327.92 },
    Arkansas: {id: "Arkansas",  class: "yellows", d: "M 1454.89 1488.073 L 1454.833 1465.658 L 1411 1465.788 L 1411 1297.729 L 1585.716 1297.729 L 1585.716 1488.073 L 1454.89 1488.073 Z",
                    box_id: "Arkansas_box",   box_x: 1429.89, box_y: 1313.92, box_width: 80,  box_height: 80, adjusted_input_x: 1435.89, adjusted_input_y: 1248.92 },
    Louisiana: {id: "Louisiana", class: "yellows", d: "M 1455 1488 L 1585.81 1488 L 1585.81 1603.98 L 1677 1603.98 L 1677 1746 L 1455 1746 Z",  
                    box_id: "Louisiana_box",  box_x: 1462.89, box_y: 1606.92, box_width: 80,  box_height: 80, adjusted_input_x: 1468.89, adjusted_input_y: 1541.92 },
    Florida: {id: "Florida", class: "yellows", d: "M2039.73,1881.75V1665.78H1819.76V1563.79h329.96v317.96H2039.73Z",   
                    box_id: "Florida_box",  box_x: 2042,  box_y: 1567,  box_width: 90,  box_height: 132,   adjusted_input_x: 2056,  adjusted_input_y: 1510 },            
    Tennessee: { id:'Tennessee', class: 'yellows', x: 1586.107,    y: 1237.66, height: 106.15 , width: 457.613,     
                    box_id: "Tennessee_box",   box_x: 1733,    box_y: 1239   , box_width: 134, box_height: 96,      
                    adjusted_input_x: 1739,     adjusted_input_y: 1174},
    Kentucky: {id: "Kentucky",  class: "yellows", d: "M 1960 1029.186 L 1960 1238 L 1585.763 1238 L 1585.763 1132.149 L 1744.087 1132.149 L 1744.087 1029.186",
                    box_id: "Kentucky_box",   box_x: 1778.89, box_y: 1065.92, box_width: 80,  box_height: 80, adjusted_input_x: 1784.89, adjusted_input_y: 1000.92 },
    Missouri: {id: "Missouri",  class: "yellows", d: "M 1410.987 1002 L 1585.99 1002 L 1585.99 1298.01 L 1410.987 1298.01 L 1410.987 1002 Z",  
                    box_id: "Missouri_box",   box_x: 1429.89, box_y: 1091.92, box_width: 80,  box_height: 80, adjusted_input_x: 1435.89, adjusted_input_y: 1026.92 },            
    
                
    Maine: { id:'Maine', class: 'purples', x: 2682,    y: 288, height: 218, width: 220,     
                    box_id: "Maine_box",   box_x: 2721,    box_y: 327, box_width: 134, box_height: 134,     
                    adjusted_input_x: 2727,     adjusted_input_y: 262},
    New_York: {id: "New_York",  class: "purples", d: "M 2140 810.06 L 2140 648.123 L 2301.98 648.123 L 2301.98 496 L 2470 496 L 2470 810.06 L 2140 810.06 Z",  
                    box_id: "New_York_box",   box_x: 2313,  box_y: 669, box_width: 134, box_height: 134,   adjusted_input_x: 2319,  adjusted_input_y: 604 },
    New_Hampshire: { id:'New_Hampshire', class: 'purples', x: 2564,    y: 394, height: 218, width: 118,     
                    box_id: "New_Hampshire_box",   box_x: 2569,    box_y: 437, box_width: 94, box_height:  134,     
                    adjusted_input_x: 2583,     adjusted_input_y: 372},
    Vermont: { id:'Vermont', class: 'purples', x: 2462,    y: 394, height: 218, width: 112,     
                    box_id: "Vermont_box", box_x: 2463,    box_y: 437, box_width: 94, box_height:  134,     
                    adjusted_input_x: 2477,     adjusted_input_y: 372},
    Massachusetts: { id:'Massachusetts', class: 'purples', x: 2462,    y: 604, height: 102, width: 325.65,     
                    box_id: "Massachusetts_box",   box_x: 2556,    box_y: 612, box_width: 134, box_height: 92,      
                    adjusted_input_x: 2562,     adjusted_input_y: 547},
    Rhode_Island: {id: "Rhode_Island",  class: "purples", d: "M 2639.65 703.907 L 2787.63 703.907 L 2787.63 809.782 L 2639.65 809.782 L 2639.65 703.907 Z",   
                    box_id: "Rhode_Island_box",   box_x: 2654,  box_y: 713, box_width: 125, box_height: 95, adjusted_input_x: 2660,  adjusted_input_y: 648 },            
    Connecticut: {id: "Connecticut", class: "purples", d: "M 2461.964 703.907 L 2651.65 703.907 L 2651.65 809.782 L 2461.964 809.782 L 2461.964 703.907 Z ",
                    box_id: "Connecticut_box",  box_x: 2489,  box_y: 713, box_width: 134, box_height: 95, adjusted_input_x: 2495,  adjusted_input_y: 648 },
    New_Jersey: { id:'New_Jersey', class: 'purples', x: 2388,    y: 810, height: 116, width: 215.501,     
                    box_id: "New_Jersey_box",  box_x: 2426,    box_y: 820, box_width: 134, box_height: 95,      
                    adjusted_input_x: 2432,     adjusted_input_y: 755},
    
    Nebraska: {id: "Nebraska",  class: "greens",  d: "M 1166.174 1069.519 L 1165.594 1012.803 L 1122.618 1011.958 L 1122.455 897.882 L 1411.81 897.627 L 1411.81 1069.264 L 1166.174 1069.519 Z", 
                    box_id: "Nebraska_box",   box_x: 1211.89, box_y: 919.925, box_width: 80,  box_height: 80, adjusted_input_x: 1217.89, adjusted_input_y: 854.925 },
    Texas: {id: "Texas", class: "greens",  d: "M 1332.097 1745.77 L 1332.097 1845.76 L 1158.344 1845.76 L 1158.344 1632.79 L 1013.87 1632.79 L 1013.87 1517.8 L 1111.481 1517.8 L 1111.481 1319.83 L 1220.817 1319.83 L 1220.817 1465.81 L 1455.101 1465.81 L 1455.101 1745.77 L 1332.097 1745.77 Z",
                    box_id: "Texas_box",  box_x: 1217.89, box_y: 1537.92, box_width: 80,  box_height: 80, adjusted_input_x: 1223.89, adjusted_input_y: 1472.92 },
    Kansas: {id: "Kansas",  class: "greens",  d: "M1157.85,1069.86h253.96v169.98H1157.85V1069.86Z",   
                    box_id: "Kansas_box", box_x: 1221.89, box_y: 1091.92, box_width: 80,  box_height: 80, adjusted_input_x: 1227.89, adjusted_input_y: 1026.92 },
    New_Mexico: {id: "New_Mexico",  class: "greens",  d: "M 891.699 1239.466 L 1121.85 1239.466 L 1121.85 1517.8 L 891.699 1517.8 L 891.699 1239.466 Z",   
                    box_id: "New_Mexico_box", box_x: 935.888, box_y: 1312.92, box_width: 80,  box_height: 80, adjusted_input_x: 941.888, adjusted_input_y: 1247.92 },
    Oklahoma: {id: "Oklahoma",  class: "greens",  d: "M 1218.223 1465.81 L 1218.223 1319.83 L 1121.816 1319.69 L 1122.303 1239.842 L 1411.367 1240.159 L 1410.903 1465.81 L 1218.223 1465.81 Z", 
                    box_id: "Oklahoma_box",   box_x: 1248.89, box_y: 1280.92, box_width: 80,  box_height: 80, adjusted_input_x: 1254.89, adjusted_input_y: 1215.92 },
    Colorado: {id: "Colorado",  class: "greens",  d: "M 891.986 1011.911 L 1165.85 1011.911 L 1165.85 1239.84 L 891.986 1239.84 L 891.986 1011.911 Z",
                    box_id: "Colorado_box",   box_x: 957.888, box_y: 1063.92, box_width: 80,  box_height: 80, adjusted_input_x: 963.888, adjusted_input_y: 998.92 },
    Wyoming: { id:'Wyoming', class: 'greens', x: 823.604, y: 771, height: 240.893, width: 298.626,     
                    box_id: "Wyoming_box", box_x: 899.888, box_y: 831.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 905.888,  adjusted_input_y: 766.925},
    
    Indiana: { id:'Indiana', class: 'blues', x: 1736,    y: 810, height: 219, width: 158,     
                    box_id: "Indiana_box", box_x: 1746.84, box_y: 852.9  , box_width: 80, box_height:  80,      
                    adjusted_input_x: 1752.84,  adjusted_input_y: 787.9},
    Michigan: {id: "Michigan",  class: "blues", d: "M 1743.944 554 L 1952 554 L 1952 809.695 L 1829.835 809.695 L 1829.835 668.463 L 1743.944 668.463 Z",   
                    box_id: "Michigan_box",   box_x: 1835, box_y: 653.906, box_width: 80,  box_height: 80, adjusted_input_x: 1837.84, adjusted_input_y: 588.906 },
    Wisconsin: { id:'Wisconsin', class: 'blues', x: 1585.51, y: 554, height: 256.304, width: 158.491,     
                    box_id: "Wisconsin_box",   box_x: 1593.84, box_y: 592.9  , box_width: 80, box_height:  80,      
                    adjusted_input_x: 1599.84,  adjusted_input_y: 527.9},
    Illinois: { id:'Illinois', class: 'blues', x: 1585.899,    y: 810, height: 326, width: 158.101,     
                    box_id: "Illinois_box",    box_x: 1593.84, box_y: 897.9  , box_width: 80, box_height:  80,      
                    adjusted_input_x: 1599.84,  adjusted_input_y: 832.9},
    Iowa: {id: "Iowa",  class: "blues", d: "M 1411.758 769.9 L 1585.79 769.9 L 1585.79 1011.87 L 1411.758 1011.87 L 1411.758 769.9 Z",   
                    box_id: "Iowa_box",   box_x: 1426.84, box_y: 831.9, box_width: 80,  box_height: 80, adjusted_input_x: 1432.84, adjusted_input_y: 766.9 },
    Minnesota: {id: "Minnesota", class: "blues", d: "M1404.01,504H1586V782H1404.01V504Z", 
                    box_id: "Minnesota_box",  box_x: 1429.84, box_y: 573.9, box_width: 80,  box_height: 80, adjusted_input_x: 1435.84, adjusted_input_y: 508.9 },
    South_Dakota: {id: "South_Dakota",  class: "blues", d: "M 1120.659 705.907 L 1411.81 705.907 L 1411.81 897.693 L 1120.659 897.693 L 1120.659 705.907 Z", 
                    box_id: "South_Dakota_square_box",  box_x: 1195.84, box_y: 739.9, box_width: 80,  box_height: 80, adjusted_input_x: 1201.84, adjusted_input_y: 674.9 },
    North_Dakota: {id: "North_Dakota",  class: "blues", d: "M 1121.653 504 L 1412.01 504 L 1412.01 716.464 L 1121.653 716.464 L 1121.653 504 Z", 
                    box_id: "North_Dakota_square_box",  box_x: 1195.84, box_y: 543.929, box_width: 80,  box_height: 80, adjusted_input_x: 1201.84, adjusted_input_y: 478.929 },
    Montana: { id:'Montana', class: 'blues', x: 722.398, y: 504, height: 268.821, width: 399.602,     
                    box_id: "Montana_box", box_x: 853.888, box_y: 573.925, box_width: 80, box_height:  80,      
                    adjusted_input_x: 859.888,  adjusted_input_y: 508.925}
                }

var statesGraph = {
    California: ["Oregon", "Nevada", "Arizona"],
    Idaho: ["Montana", "Wyoming", "Washington", "Oregon", "Nevada", "Utah"],
    Utah: ["Idaho", "Nevada", "Arizona", "Colorado", "Wyoming"],
    Nevada: ["Oregon", "Idaho", "California", "Arizona", "Utah"],
    Arizona: ["New_Mexico", "Utah", "Nevada", "California"],
    Oregon: ["Washington", "Idaho", "California", "Nevada"],
    Washington: ["Oregon", "Idaho"],
    Hawaii: [],
    Alaska: [],
    Georgia: ["Florida", "Alabama", "Tennessee", "North_Carolina", "South_Carolina"],
    North_Carolina: ["South_Carolina", "Georgia", "Tennessee", "Virginia"],
    South_Carolina: ["Georgia", "North_Carolina"],
    Virginia: ["North_Carolina", "West_Virginia", "Maryland", "Tennessee", "Kentucky"],
    Maryland: ["Delaware", "Pennsylvania", "Virginia", "West_Virginia"],
    Delaware: ["Maryland", "New_Jersey", "Pennsylvania"],
    West_Virginia: ["Kentucky", "Maryland", "Ohio", "Pennsylvania", "Virginia"],
    Pennsylvania: ["Delaware", "Maryland", "New_Jersey", "New_York", "Ohio", "West_Virginia"],
    Ohio: ["Indiana", "Kentucky", "Michigan", "Pennsylvania", "West_Virginia"],
    Alabama: ["Florida", "Georgia", "Mississippi", "Tennessee"],
    Mississippi: ["Alabama", "Arkansas", "Louisiana", "Tennessee"],
    Arkansas: ["Louisiana", "Mississippi", "Missouri", "Oklahoma", "Tennessee", "Texas"],
    Louisiana: ["Arkansas", "Mississippi", "Texas"],
    Florida: ["Alabama", "Georgia"],
    Tennessee: ["Alabama", "Arkansas", "Georgia", "Kentucky", "Mississippi", "Missouri", "North_Carolina", "Virginia"],
    Kentucky: ["Illinois", "Indiana", "Missouri", "Ohio", "Tennessee", "Virginia", "West_Virginia"],
    Missouri: ["Arkansas", "Illinois", "Iowa", "Kansas", "Kentucky", "Nebraska", "Oklahoma", "Tennessee"],
    Maine: ["New_Hampshire"],
    New_York: ["Connecticut", "Massachusetts", "New_Jersey", "Pennsylvania", "Vermont"],
    New_Hampshire: ["Maine", "Massachusetts", "Vermont"],
    Vermont: ["Massachusetts", "New_Hampshire", "New_York"],
    Massachusetts: ["Connecticut", "New_Hampshire", "New_York", "Rhode_Island", "Vermont"],
    Rhode_Island: ["Connecticut", "Massachusetts"],
    Connecticut: ["Massachusetts", "New_York", "Rhode_Island"],
    New_Jersey: ["Delaware", "New_York", "Pennsylvania"],
    Nebraska: ["Colorado", "Iowa", "Kansas", "Missouri", "South_Dakota", "Wyoming"],
    Texas: ["Arkansas", "Louisiana", "New_Mexico", "Oklahoma"],
    Kansas: ["Colorado", "Missouri", "Nebraska", "Oklahoma"],
    New_Mexico: ["Arizona", "Colorado", "Oklahoma", "Texas"],
    Oklahoma: ["Arkansas", "Colorado", "Kansas", "Missouri", "New_Mexico", "Texas"],
    Colorado: ["Kansas", "Nebraska", "New_Mexico", "Oklahoma", "Utah", "Wyoming"],
    Wyoming: ["Colorado", "Idaho", "Montana", "Nebraska", "South_Dakota", "Utah"],
    Indiana: ["Illinois", "Kentucky", "Michigan", "Ohio"],
    Michigan: ["Illinois", "Indiana", "Ohio", "Wisconsin"],
    Wisconsin: ["Illinois", "Iowa", "Michigan", "Minnesota"],
    Illinois: ["Indiana", "Iowa", "Michigan", "Kentucky", "Missouri", "Wisconsin"],
    Iowa: ["Illinois", "Minnesota", "Missouri", "Nebraska", "South_Dakota", "Wisconsin"],
    Minnesota: ["Iowa", "North_Dakota", "South_Dakota", "Wisconsin"],
    South_Dakota: ["Iowa", "Minnesota", "Montana", "Nebraska", "North_Dakota", "Wyoming"],
    North_Dakota: ["Minnesota", "Montana", "South_Dakota"],
    Montana: ["Idaho", "North_Dakota", "South_Dakota", "Wyoming"],
}