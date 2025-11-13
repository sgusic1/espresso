function CoffeePattern1() {
  return (
    <svg
      viewBox="0 0 500 300"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-[200%] h-[200%] -translate-x-1/3 -translate-y-1/3 opacity-100"
    >
      <path
        fill="none"
        stroke="#4A1C05"
        stroke-width="28"
        opacity="0.9"
        d="
          M60,160
          C80,80,200,50,320,80
          C440,110,460,190,380,230
          C300,270,160,250,90,210
          C50,190,40,180,60,160Z
        "
      />

      <path
        fill="none"
        stroke="#6B351B"
        stroke-width="18"
        opacity="0.8"
        d="
          M90,160
          C110,100,210,80,310,100
          C410,120,420,180,350,210
          C280,240,180,220,120,190
          C90,180,80,170,90,160Z
        "
      />

      <path
        fill="none"
        stroke="#8C5A3B"
        stroke-width="10"
        opacity="0.6"
        d="
          M120,165
          C140,120,230,110,300,130
          C370,150,370,190,320,210
          C270,230,200,210,150,185
          C130,175,120,170,120,165Z
        "
      />

      <path
        fill="#5C3017"
        opacity="0.15"
        d="
          M80,160
          C120,90,240,70,350,90
          C460,110,470,190,380,230
          C290,270,150,250,90,210
          C60,190,60,170,80,160Z
        "
      />

      <circle fill="#4A1C05" cx="380" cy="240" r="8" />
      <circle fill="#8C5A3B" cx="400" cy="220" r="5" />
      <circle fill="#6B351B" cx="120" cy="250" r="6" />
      <circle fill="#8C5A3B" cx="100" cy="230" r="4" />
      <circle fill="#4A1C05" cx="80" cy="200" r="3.5" />
      <circle fill="#8C5A3B" cx="420" cy="180" r="5" />
      <circle fill="#6B351B" cx="440" cy="160" r="4" />
      <circle fill="#8C5A3B" cx="380" cy="100" r="4" />
      <circle fill="#4A1C05" cx="340" cy="80" r="5" />

      <ellipse
        fill="#6B351B"
        opacity="0.4"
        cx="250"
        cy="240"
        rx="12"
        ry="4"
        transform="rotate(-10)"
      />
      <ellipse
        fill="#8C5A3B"
        opacity="0.3"
        cx="300"
        cy="210"
        rx="10"
        ry="3"
        transform="rotate(20)"
      />
      <ellipse
        fill="#5C3017"
        opacity="0.2"
        cx="180"
        cy="200"
        rx="8"
        ry="3"
        transform="rotate(-15)"
      />
    </svg>
  );
}

export default CoffeePattern1;
