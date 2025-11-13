function CoffeePattern2() {
  return (
    <svg
      viewBox="-300 40 500 300"
      xmlns="http://www.w3.org/2000/svg"
      className="absolute inset-0 w-[300%] h-[300%] -translate-x-1/3 -translate-y-1/3 opacity-100"
    >
      <path
        fill="#3B1A07"
        opacity="0.9"
        d="M80,160
          C120,90,240,70,350,90
          C460,110,470,190,380,230
          C290,270,150,250,90,210
          C60,190,60,170,80,160Z"
      />

      <path
        fill="#7B3F15"
        opacity="0.75"
        d="M100,165
          C140,110,250,90,340,110
          C430,130,440,180,360,210
          C280,240,170,230,120,190
          C90,175,90,170,100,165Z"
      />

      <path
        fill="#B87333"
        opacity="0.5"
        d="M140,160
          C180,120,270,120,330,135
          C390,150,400,180,340,200
          C280,220,200,210,160,185
          C140,170,135,165,140,160Z"
      />

      <path
        fill="#E0A369"
        opacity="0.35"
        d="
          M180,155
          C210,135,280,135,320,150
          C360,165,360,185,310,195
          C260,205,200,190,180,165Z"
      />

      <path
        fill="#2C1003"
        opacity="0.55"
        d="
          M80,160
          C100,100,220,70,350,100
          C460,130,470,190,390,230
          C320,260,200,260,120,210
          C80,185,75,170,80,160Z"
      />

      <circle fill="#3B1A07" cx="380" cy="240" r="9" />
      <circle fill="#7B3F15" cx="400" cy="220" r="6" />
      <circle fill="#B87333" cx="120" cy="250" r="8" />
      <circle fill="#4A1C05" cx="90" cy="230" r="5" />
      <circle fill="#E0A369" cx="420" cy="180" r="7" />
      <circle fill="#7B3F15" cx="440" cy="160" r="5" />
      <circle fill="#5C3017" cx="350" cy="90" r="6" />
      <circle fill="#B87333" cx="320" cy="80" r="5" />

      <ellipse
        fill="#E7BB88"
        opacity="0.3"
        cx="240"
        cy="170"
        rx="120"
        ry="40"
        transform="rotate(-8)"
      />
      <ellipse
        fill="#A05625"
        opacity="0.25"
        cx="250"
        cy="200"
        rx="180"
        ry="50"
        transform="rotate(10)"
      />

      <ellipse
        fill="#000000"
        opacity="0.15"
        cx="250"
        cy="230"
        rx="180"
        ry="35"
      />
    </svg>
  );
}

export default CoffeePattern2;
