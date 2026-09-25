<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1000 1000" width="100%" height="100%">
  <defs>
    <!-- Background Radial Gradient -->
    <radialGradient id="bgGlow" cx="50%" cy="45%" r="65%" fx="50%" fy="45%">
      <stop offset="0%" stop-color="#221236" />
      <stop offset="60%" stop-color="#0a0512" />
      <stop offset="100%" stop-color="#040207" />
    </radialGradient>

    <!-- Gold / Orange Gradients -->
    <linearGradient id="goldLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#fff1a8" />
      <stop offset="30%" stop-color="#ffbe3b" />
      <stop offset="70%" stop-color="#f37300" />
      <stop offset="100%" stop-color="#993100" />
    </linearGradient>

    <linearGradient id="goldMain" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffcb43" />
      <stop offset="45%" stop-color="#ff8400" />
      <stop offset="85%" stop-color="#d04400" />
      <stop offset="100%" stop-color="#731a00" />
    </linearGradient>

    <linearGradient id="goldHighlight" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="50%" stop-color="#ffe699" />
      <stop offset="100%" stop-color="#ffa200" />
    </linearGradient>

    <linearGradient id="goldDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#a83c00" />
      <stop offset="100%" stop-color="#3b0a00" />
    </linearGradient>

    <!-- Metallic Steel Gradients -->
    <linearGradient id="metalLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="35%" stop-color="#e2e8f0" />
      <stop offset="70%" stop-color="#94a3b8" />
      <stop offset="100%" stop-color="#475569" />
    </linearGradient>

    <linearGradient id="metalMid" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#94a3b8" />
      <stop offset="50%" stop-color="#475569" />
      <stop offset="100%" stop-color="#1e293b" />
    </linearGradient>

    <linearGradient id="metalDark" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#334155" />
      <stop offset="50%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <linearGradient id="metalDarkest" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#090d16" />
    </linearGradient>

    <!-- Sword Blade Gradients -->
    <linearGradient id="bladeLight" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="40%" stop-color="#cbd5e1" />
      <stop offset="100%" stop-color="#64748b" />
    </linearGradient>

    <linearGradient id="bladeShadow" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#475569" />
      <stop offset="60%" stop-color="#1e293b" />
      <stop offset="100%" stop-color="#0f172a" />
    </linearGradient>

    <!-- Text & Bevel Fill -->
    <linearGradient id="textGold" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffdc73" />
      <stop offset="25%" stop-color="#ff9d00" />
      <stop offset="70%" stop-color="#e64a00" />
      <stop offset="100%" stop-color="#8a1c00" />
    </linearGradient>

    <linearGradient id="text3dDepth" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#5e1100" />
      <stop offset="100%" stop-color="#1f0300" />
    </linearGradient>

    <linearGradient id="silverText" x1="0%" y1="0%" x2="0%" y2="100%">
      <stop offset="0%" stop-color="#ffffff" />
      <stop offset="100%" stop-color="#94a3b8" />
    </linearGradient>

    <!-- Drop Shadows & Glow Filters -->
    <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="10" stdDeviation="12" flood-color="#000000" flood-opacity="0.8" />
    </filter>

    <filter id="orangeGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feGaussianBlur stdDeviation="8" result="blur" />
      <feComposite in="SourceGraphic" in2="blur" operator="over" />
    </filter>
  </defs>

  <!-- Canvas Background -->
  <rect width="1000" height="1000" fill="url(#bgGlow)" />

  <!-- Outer Dark Emblem Silhouette Base -->
  <path d="M 500,60 
           L 640,110 L 840,330 L 840,580 L 820,600 L 780,600 
           L 840,780 L 500,810 L 160,780 L 220,600 L 180,600 
           L 160,580 L 160,330 L 360,110 Z" 
        fill="#040208" opacity="0.6" />

  <!-- ========================================== -->
  <!--               KNIGHT BODY / ARMOR          -->
  <!-- ========================================== -->
  <g filter="url(#dropShadow)">

    <!-- LEFT SHOULDER / PAULDRON (Viewer's Left) -->
    <g id="left-pauldron">
      <!-- Base Layer -->
      <path d="M 380,310 L 230,360 L 190,440 L 210,540 L 340,590 L 390,480 L 380,310 Z" fill="url(#metalDarkest)" />
      <!-- Plate 1 (Top) -->
      <path d="M 380,310 L 250,350 L 215,400 L 365,420 Z" fill="url(#metalDark)" />
      <path d="M 380,310 L 250,350 L 260,360 L 375,322 Z" fill="url(#goldMain)" /> <!-- Gold Trim -->
      <path d="M 365,420 L 215,400 L 210,405 L 360,425 Z" fill="url(#metalLight)" opacity="0.4" />
      <!-- Plate 2 (Middle) -->
      <path d="M 365,415 L 210,395 L 195,455 L 355,475 Z" fill="url(#metalMid)" />
      <path d="M 365,415 L 210,395 L 213,405 L 360,422 Z" fill="url(#goldMain)" /> <!-- Gold Trim -->
      <path d="M 355,475 L 195,455 L 190,462 L 350,482 Z" fill="url(#metalLight)" opacity="0.3" />
      <!-- Plate 3 (Bottom) -->
      <path d="M 355,470 L 190,450 L 205,535 L 340,565 Z" fill="url(#metalDark)" />
      <path d="M 355,470 L 190,450 L 194,460 L 350,478 Z" fill="url(#goldMain)" /> <!-- Gold Trim -->
      <!-- Highlights & Inner Shadows -->
      <path d="M 380,310 L 365,420 L 355,475 L 340,565 L 320,560 L 340,470 L 350,415 L 365,315 Z" fill="url(#metalLight)" opacity="0.25" />
    </g>

    <!-- RIGHT SHOULDER / PAULDRON (Viewer's Right) -->
    <g id="right-pauldron">
      <!-- Base Layer -->
      <path d="M 620,310 L 770,360 L 810,440 L 790,540 L 660,590 L 610,480 L 620,310 Z" fill="url(#metalDarkest)" />
      <!-- Plate 1 (Top) -->
      <path d="M 620,310 L 750,350 L 785,400 L 635,420 Z" fill="url(#metalMid)" />
      <path d="M 620,310 L 750,350 L 740,360 L 625,322 Z" fill="url(#goldMain)" /> <!-- Gold Trim -->
      <path d="M 635,420 L 785,400 L 780,390 L 630,410 Z" fill="url(#metalLight)" opacity="0.8" />
      <!-- Plate 2 (Middle) -->
      <path d="M 635,415 L 790,395 L 805,455 L 645,475 Z" fill="url(#metalLight)" />
      <path d="M 635,415 L 790,395 L 787,405 L 640,422 Z" fill="url(#goldMain)" /> <!-- Gold Trim -->
      <path d="M 645,475 L 805,455 L 800,445 L 640,465 Z" fill="#ffffff" opacity="0.6" />
      <!-- Plate 3 (Bottom) -->
      <path d="M 645,470 L 810,450 L 795,535 L 660,565 Z" fill="url(#metalMid)" />
      <path d="M 645,470 L 810,450 L 806,460 L 650,478 Z" fill="url(#goldMain)" /> <!-- Gold Trim -->
      <!-- Highlights -->
      <path d="M 750,350 L 785,400 L 805,455 L 795,535 L 780,530 L 790,450 L 770,395 L 735,350 Z" fill="#ffffff" opacity="0.4" />
    </g>

    <!-- BREASTPLATE / CHEST ARMOR -->
    <g id="chest-armor">
      <!-- Center Dark Backplate -->
      <path d="M 370,330 L 500,360 L 630,330 L 640,480 L 500,560 L 360,480 Z" fill="#0b0f17" />
      
      <!-- Gorget / Neck Guard -->
      <path d="M 410,320 L 500,345 L 590,320 L 570,375 L 500,395 L 430,375 Z" fill="url(#metalDark)" />
      <path d="M 430,375 L 500,395 L 570,375 L 560,385 L 500,402 L 440,385 Z" fill="url(#goldMain)" />
      <path d="M 500,345 L 590,320 L 570,375 L 500,395 Z" fill="url(#metalLight)" opacity="0.3" />

      <!-- Left Chest Plate -->
      <path d="M 370,350 L 492,390 L 492,545 L 365,475 Z" fill="url(#metalDark)" />
      <path d="M 370,350 L 430,365 L 440,475 L 365,475 Z" fill="url(#metalDarkest)" />
      <path d="M 430,365 L 492,390 L 492,545 L 440,475 Z" fill="url(#metalMid)" opacity="0.5" />

      <!-- Right Chest Plate -->
      <path d="M 630,350 L 508,390 L 508,545 L 635,475 Z" fill="url(#metalLight)" />
      <path d="M 630,350 L 570,365 L 560,475 L 635,475 Z" fill="url(#metalMid)" />
      <path d="M 570,365 L 508,390 L 508,545 L 560,475 Z" fill="#ffffff" opacity="0.6" />

      <!-- Center Chest Ridge Highlight -->
      <polygon points="496,385 504,385 504,550 496,550" fill="url(#goldHighlight)" />
    </g>

    <!-- ========================================== -->
    <!--               SWORD                        -->
    <!-- ========================================== -->
    <g id="sword" filter="url(#dropShadow)">
      <!-- Blade Shadow / Outline -->
      <path d="M 405,535 L 815,125 L 830,130 L 825,145 L 455,585 Z" fill="#040207" />

      <!-- Blade Left Side (Lighted Edge) -->
      <path d="M 418,528 L 818,128 L 823,137 L 438,548 Z" fill="url(#bladeLight)" />
      <path d="M 420,530 L 818,128 L 820,132 L 426,536 Z" fill="#ffffff" />

      <!-- Blade Right Side (Shaded Edge) -->
      <path d="M 438,548 L 823,137 L 818,148 L 450,562 Z" fill="url(#bladeShadow)" />

      <!-- Sword Center Ridge Line -->
      <line x1="418" y1="528" x2="823" y2="137" stroke="#ffffff" stroke-width="1.5" opacity="0.8" />

      <!-- Crossguard (Gold) -->
      <path d="M 400,500 L 510,570 L 495,590 L 410,535 Z" fill="url(#goldDark)" />
      <path d="M 405,505 L 505,568 L 490,582 L 415,530 Z" fill="url(#goldMain)" />
      <path d="M 405,505 L 505,568 L 485,550 L 415,510 Z" fill="url(#goldHighlight)" />
      <!-- Guard Center Gem / Ornament -->
      <polygon points="450,530 465,520 475,535 460,545" fill="url(#goldLight)" />
    </g>

    <!-- ========================================== -->
    <!--               GAUNTLETS / HANDS            -->
    <!-- ========================================== -->
    <g id="hands">
      <!-- Left Hand / Gauntlet -->
      <g id="left-hand">
        <path d="M 350,540 L 420,520 L 460,570 L 390,610 Z" fill="url(#metalDarkest)" />
        <!-- Knuckles / Segmented Plates -->
        <path d="M 380,545 L 425,530 L 435,550 L 390,565 Z" fill="url(#metalDark)" />
        <path d="M 390,568 L 438,552 L 448,572 L 400,588 Z" fill="url(#metalMid)" />
        <path d="M 400,590 L 448,574 L 458,594 L 410,610 Z" fill="url(#metalDark)" />
        <!-- Plate Highlights -->
        <line x1="380" y1="545" x2="425" y2="530" stroke="url(#metalLight)" stroke-width="2" />
        <line x1="390" y1="568" x2="438" y2="552" stroke="url(#metalLight)" stroke-width="2" />
        <line x1="400" y1="590" x2="448" y2="574" stroke="url(#metalLight)" stroke-width="2" />
      </g>

      <!-- Right Hand / Gauntlet -->
      <g id="right-hand">
        <path d="M 650,540 L 580,520 L 540,570 L 610,610 Z" fill="url(#metalDarkest)" />
        <!-- Knuckles / Segmented Plates -->
        <path d="M 620,545 L 575,530 L 565,550 L 610,565 Z" fill="url(#metalMid)" />
        <path d="M 610,568 L 562,552 L 552,572 L 600,588 Z" fill="url(#metalLight)" />
        <path d="M 600,590 L 552,574 L 542,594 L 590,610 Z" fill="url(#metalMid)" />
        <!-- Plate Highlights -->
        <line x1="620" y1="545" x2="575" y2="530" stroke="#ffffff" stroke-width="2" />
        <line x1="610" y1="568" x2="562" y2="552" stroke="#ffffff" stroke-width="2" />
        <line x1="600" y1="590" x2="552" y2="574" stroke="#ffffff" stroke-width="2" />
      </g>
    </g>

    <!-- ========================================== -->
    <!--               HELMET                       -->
    <!-- ========================================== -->
    <g id="helmet" filter="url(#dropShadow)">
      <!-- Helmet Base & Neck Shadow -->
      <path d="M 410,180 L 500,165 L 590,180 L 600,320 L 570,375 L 500,400 L 430,375 L 400,320 Z" fill="#05070a" />

      <!-- Left Dome / Forehead -->
      <path d="M 420,185 L 496,170 L 496,240 L 425,240 Z" fill="url(#metalDark)" />
      <!-- Right Dome / Forehead -->
      <path d="M 580,185 L 504,170 L 504,240 L 575,240 Z" fill="url(#metalLight)" />
      <!-- Center Ridge Highlight -->
      <rect x="496" y="168" width="8" height="75" fill="url(#metalLight)" />

      <!-- Brow Plate (Gold/Steel Band) -->
      <path d="M 415,235 L 500,245 L 585,235 L 580,255 L 500,265 L 420,255 Z" fill="url(#metalDarkest)" />
      <path d="M 420,240 L 500,250 L 580,240 L 575,250 L 500,260 L 425,250 Z" fill="url(#goldMain)" />

      <!-- Cheek & Jaw Plates -->
      <!-- Left Jaw -->
      <path d="M 425,255 L 496,268 L 496,380 L 435,350 L 415,300 Z" fill="url(#metalDark)" />
      <path d="M 450,275 L 490,282 L 490,360 L 455,340 Z" fill="url(#metalDarkest)" />
      <!-- Right Jaw -->
      <path d="M 575,255 L 504,268 L 504,380 L 565,350 L 585,300 Z" fill="url(#metalLight)" />
      <path d="M 550,275 L 510,282 L 510,360 L 545,340 Z" fill="url(#metalMid)" />

      <!-- Central Face Divider Ridge -->
      <polygon points="496,245 504,245 504,385 496,385" fill="#ffffff" opacity="0.9" />

      <!-- T-VISOR / SLITS (DARK VOID) -->
      <g id="visor-slits">
        <!-- Horizontal Eye Slit -->
        <path d="M 430,250 L 500,260 L 570,250 L 565,270 L 500,278 L 435,270 Z" fill="#000000" />
        <!-- Vertical Nose/Mouth Slit -->
        <path d="M 490,265 L 510,265 L 506,365 L 494,365 Z" fill="#000000" />
        
        <!-- Visor Inner Shadow Edge -->
        <path d="M 435,252 L 500,262 L 565,252" stroke="#1e293b" stroke-width="3" fill="none" />
        
        <!-- Vent Grille Slits (Left Side) -->
        <line x1="450" y1="290" x2="480" y2="298" stroke="#000000" stroke-width="3" />
        <line x1="452" y1="305" x2="480" y2="313" stroke="#000000" stroke-width="3" />
        <line x1="455" y1="320" x2="480" y2="328" stroke="#000000" stroke-width="3" />
        <line x1="458" y1="335" x2="480" y2="343" stroke="#000000" stroke-width="3" />

        <!-- Vent Grille Slits (Right Side) -->
        <line x1="550" y1="290" x2="520" y2="298" stroke="#000000" stroke-width="3" />
        <line x1="548" y1="305" x2="520" y2="313" stroke="#000000" stroke-width="3" />
        <line x1="545" y1="320" x2="520" y2="328" stroke="#000000" stroke-width="3" />
        <line x1="542" y1="335" x2="520" y2="343" stroke="#000000" stroke-width="3" />
      </g>
    </g>

    <!-- ========================================== -->
    <!--               CROWN                        -->
    <!-- ========================================== -->
    <g id="crown" filter="url(#dropShadow)">
      <!-- Crown Base Rim -->
      <path d="M 420,185 L 500,198 L 580,185 L 575,170 L 500,182 L 425,170 Z" fill="url(#goldDark)" />
      <path d="M 423,180 L 500,192 L 577,180 L 573,173 L 500,184 L 427,173 Z" fill="url(#goldHighlight)" />

      <!-- Center Peak -->
      <path d="M 500,80 L 470,180 L 500,192 L 530,180 Z" fill="url(#goldMain)" />
      <path d="M 500,80 L 500,192 L 530,180 Z" fill="url(#goldHighlight)" />

      <!-- Inner Left Peak -->
      <path d="M 450,115 L 430,180 L 472,183 Z" fill="url(#goldDark)" />
      <path d="M 450,115 L 452,181 L 472,183 Z" fill="url(#goldMain)" />

      <!-- Inner Right Peak -->
      <path d="M 550,115 L 570,180 L 528,183 Z" fill="url(#goldMain)" />
      <path d="M 550,115 L 548,181 L 528,183 Z" fill="url(#goldHighlight)" />

      <!-- Outer Left Peak -->
      <path d="M 418,120 L 422,175 L 442,178 Z" fill="url(#goldDark)" />
      <path d="M 418,120 L 430,176 L 442,178 Z" fill="url(#goldMain)" />

      <!-- Outer Right Peak -->
      <path d="M 582,120 L 578,175 L 558,178 Z" fill="url(#goldHighlight)" />
      <path d="M 582,120 L 570,176 L 558,178 Z" fill="url(#goldMain)" />

      <!-- Crown Jewels / Facet Highlights -->
      <polygon points="500,100 492,140 500,155 508,140" fill="#ffffff" opacity="0.6" />
    </g>

  </g> <!-- End Knight Group -->

  <!-- ========================================== -->
  <!--               TYPOGRAPHY "KAS"             -->
  <!-- ========================================== -->
  <g id="kas-text" filter="url(#dropShadow)">

    <!-- 3D EXTRUSION / BOTTOM SHADOW LAYER -->
    <g fill="url(#text3dDepth)">
      <!-- K Depth -->
      <path d="M 185,615 L 285,615 L 285,670 L 330,615 L 395,615 L 325,695 L 400,800 L 330,800 L 285,730 L 285,800 L 185,800 Z" transform="translate(0, 18)" />
      <!-- A Depth -->
      <path d="M 500,615 L 615,800 L 545,800 L 525,760 L 475,760 L 455,800 L 385,800 Z" transform="translate(0, 18)" />
      <!-- S Depth -->
      <path d="M 805,655 L 740,655 L 740,670 L 805,690 L 805,800 L 630,800 L 630,740 L 735,740 L 735,725 L 635,700 L 635,615 L 805,615 Z" transform="translate(0, 18)" />
    </g>

    <!-- MAIN LETTER FACES WITH GRADIENT -->
    <!-- LETTER K -->
    <g id="letter-k">
      <!-- Outer Base Stem & Legs -->
      <path d="M 185,615 L 275,615 L 275,675 L 325,615 L 390,615 L 320,695 L 395,800 L 310,800 L 275,735 L 275,800 L 185,800 Z" fill="url(#textGold)" />
      
      <!-- Bevel Upper Highlights -->
      <path d="M 185,615 L 275,615 L 265,630 L 200,630 L 200,785 L 185,800 Z" fill="url(#goldHighlight)" />
      <path d="M 325,615 L 390,615 L 310,705 L 300,690 Z" fill="url(#goldHighlight)" />
      
      <!-- Bevel Lower Shadows -->
      <path d="M 185,800 L 275,800 L 275,735 L 290,750 L 275,770 L 275,800 Z" fill="url(#goldDark)" />
      <path d="M 320,695 L 395,800 L 310,800 Z" fill="url(#goldDark)" opacity="0.5" />
    </g>

    <!-- LETTER A -->
    <g id="letter-a">
      <!-- Main Shape -->
      <path d="M 500,615 L 615,800 L 540,800 L 522,760 L 478,760 L 460,800 L 385,800 Z" fill="url(#textGold)" />
      
      <!-- Inner Triangular Cutout -->
      <polygon points="500,665 488,715 512,715" fill="#0b0512" />

      <!-- Bevel Upper Highlights -->
      <path d="M 500,615 L 615,800 L 585,800 L 500,655 L 420,800 L 385,800 Z" fill="url(#goldHighlight)" opacity="0.8" />
      <path d="M 500,615 L 500,665 L 488,715 L 478,760 L 460,800 L 385,800 Z" fill="url(#goldHighlight)" opacity="0.4" />

      <!-- Bevel Lower Shadows -->
      <path d="M 500,615 L 615,800 L 540,800 L 522,760 L 500,760 Z" fill="url(#goldDark)" opacity="0.6" />
      <!-- Horizontal Crossbar Highlight -->
      <polygon points="478,735 522,735 528,755 472,755" fill="url(#goldHighlight)" />
    </g>

    <!-- LETTER S -->
    <g id="letter-s">
      <!-- Main Shape -->
      <path d="M 805,660 L 730,660 L 730,675 C 730,685 740,690 755,695 L 805,710 C 825,715 835,730 835,750 L 835,765 C 835,790 815,800 780,800 L 630,800 L 630,740 L 735,740 L 735,725 C 735,715 725,710 710,705 L 660,690 C 640,685 630,670 630,650 L 630,635 C 630,620 645,615 680,615 L 805,615 Z" fill="url(#textGold)" />

      <!-- Bevel Upper Highlights -->
      <path d="M 680,615 L 805,615 L 805,635 L 660,635 C 645,635 645,645 645,650 L 660,690 L 710,705 Z" fill="url(#goldHighlight)" />
      <path d="M 630,740 L 735,740 L 735,725 L 710,705 L 690,725 L 630,725 Z" fill="url(#goldHighlight)" opacity="0.7" />

      <!-- Bevel Lower Shadows -->
      <path d="M 805,710 C 825,715 835,730 835,750 L 835,765 C 835,790 815,800 780,800 L 630,800 L 650,780 L 780,780 C 800,780 810,770 810,760 L 810,750 C 810,740 800,730 780,725 Z" fill="url(#goldDark)" />
    </g>

    <!-- Outer Golden Border Stroke for KAS -->
    <path d="M 185,615 L 275,615 L 275,675 L 325,615 L 390,615 L 320,695 L 395,800 L 310,800 L 275,735 L 275,800 L 185,800 Z
             M 500,615 L 615,800 L 540,800 L 522,760 L 478,760 L 460,800 L 385,800 Z
             M 805,660 L 730,660 L 730,675 C 730,685 740,690 755,695 L 805,710 C 825,715 835,730 835,750 L 835,765 C 835,790 815,800 780,800 L 630,800 L 630,740 L 735,740 L 735,725 C 735,715 725,710 710,705 L 660,690 C 640,685 630,670 630,650 L 630,635 C 630,620 645,615 680,615 L 805,615 Z" 
          stroke="url(#goldHighlight)" stroke-width="2" fill="none" opacity="0.8" />
  </g>

  <!-- ========================================== -->
  <!--        SUBTEXT "KING ARTHUR SPORTS"        -->
  <!-- ========================================== -->
  <g id="subtext" filter="url(#dropShadow)">
    <text x="500" y="848" 
          font-family="'Montserrat', 'Arial Black', 'Impact', sans-serif" 
          font-size="29" 
          font-weight="900" 
          letter-spacing="15" 
          fill="url(#silverText)" 
          text-anchor="middle">
      KING ARTHUR SPORTS
    </text>
  </g>

  <!-- ========================================== -->
  <!--           BOTTOM DECORATIVE LINE           -->
  <!-- ========================================== -->
  <g id="bottom-line">
    <!-- Left Horizontal Line -->
    <line x1="210" y1="878" x2="470" y2="878" stroke="url(#goldMain)" stroke-width="3" stroke-linecap="round" />
    
    <!-- Right Horizontal Line -->
    <line x1="530" y1="878" x2="790" y2="878" stroke="url(#goldMain)" stroke-width="3" stroke-linecap="round" />

    <!-- Center Inverted Triangle Accent -->
    <polygon points="500,890 488,872 512,872" fill="url(#goldLight)" filter="url(#orangeGlow)" />
    <polygon points="500,886 492,874 508,874" fill="#ffffff" />
  </g>

</svg>