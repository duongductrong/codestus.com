import React, { ComponentPropsWithoutRef } from "react"

export interface FaceIconProps extends ComponentPropsWithoutRef<"svg"> {}

const FaceIcon = (props: FaceIconProps) => (
  <svg
    width="100%"
    height="100%"
    {...props}
    viewBox="0 0 1080 1080"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    {" "}
    <defs>
      {" "}
      <filter
        id="filter"
        x="-20%"
        y="-20%"
        width="140%"
        height="140%"
        filterUnits="objectBoundingBox"
        primitiveUnits="userSpaceOnUse"
        colorInterpolationFilters="linearRGB"
      >
        {" "}
        <feMorphology operator="dilate" radius="20 20" in="SourceAlpha" result="morphology" />{" "}
        <feFlood floodColor="#ffffff" floodOpacity="1" result="flood" />{" "}
        <feComposite in="flood" in2="morphology" operator="in" result="composite" />{" "}
        <feMerge result="merge">
          {" "}
          <feMergeNode in="composite" result="mergeNode" />{" "}
          <feMergeNode in="SourceGraphic" result="mergeNode1" />{" "}
        </feMerge>{" "}
      </filter>
    </defs>{" "}
    <g id="notion-avatar" filter="url(#filter)">
      {" "}
      <g id="notion-avatar-face" fill="#ffffff">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Face/ 3</title>{" "}
        <g
          id="Face/-3"
          stroke="none"
          strokeWidth="1"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path
            d="M532,379 C664.54834,379 772,486.45166 772,619 C772,751.54834 704.54834,899 532,899 C402.610491,899 332.317998,816.086314 305.249034,718.717925 C264.225797,715.291578 232,680.909158 232,639 C232,599.134956 261.158843,566.080325 299.312086,560.00055 C325.599297,455.979213 419.809919,379 532,379 Z M295.858895,624.545187 L304.141105,655.454813"
            id="Path"
            stroke="#000000"
            strokeWidth="24"
          />{" "}
        </g>{" "}
      </g>
      <g id="notion-avatar-nose">
        {" "}
        <g id="Nose/ 12">
          <path
            id="Path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M648.516 575C648.516 575 659.222 580.698 667 589C673.643 596.091 676.296 606.295 680 617C683.578 627.342 695.556 636.07 695 644C692.29 682.626 644 684.16 644 684.16C644 684.16 696 684 700 643.855C701.005 633.771 688.451 626.971 684 617C679.168 606.177 677 594 669 588C660.881 581.911 648.516 575 648.516 575Z"
            fill="black"
            stroke="black"
            strokeWidth="6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>{" "}
      </g>
      <g id="notion-avatar-mouth">
        {" "}
        <g id="Mouth/ 11">
          <path
            id="Path"
            fillRule="evenodd"
            clipRule="evenodd"
            d="M529 741C529 741 595 755 627 755C659 755 689 745.528 689 745.528C689 745.528 688 814 618 814C548 814 529 741 529 741Z"
            stroke="black"
            strokeWidth="16"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>{" "}
      </g>
      <g id="notion-avatar-eyes">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Eyes/ 0</title>{" "}
        <g id="Eyes/-0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
          {" "}
          <path
            d="M570,516 C583.254834,516 594,526.745166 594,540 C594,553.254834 583.254834,564 570,564 C556.745166,564 546,553.254834 546,540 C546,526.745166 556.745166,516 570,516 Z M708,516 C721.254834,516 732,526.745166 732,540 C732,553.254834 721.254834,564 708,564 C694.745166,564 684,553.254834 684,540 C684,526.745166 694.745166,516 708,516 Z"
            id="Combined-Shape"
            fill="#000000"
          />{" "}
        </g>{" "}
      </g>
      <g id="notion-avatar-eyebrows">
        {" "}
        <g id="Eyebrows/ 11">
          <g id="Group">
            <path
              id="Path"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M682.541 491.005C682.541 491.005 728.644 489.216 741.813 495.149C754.982 501.082 753.21 511.484 753.21 511.484C753.21 511.484 746.419 503.992 737.34 499.348C728.26 494.703 682.541 491.005 682.541 491.005Z"
              fill="black"
              stroke="black"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              id="Path_2"
              fillRule="evenodd"
              clipRule="evenodd"
              d="M595.459 491.005C595.459 491.005 549.356 489.216 536.187 495.149C523.018 501.082 524.79 511.484 524.79 511.484C524.79 511.484 531.581 503.992 540.66 499.348C549.74 494.703 595.459 491.005 595.459 491.005Z"
              fill="black"
              stroke="black"
              strokeWidth="8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </g>
        </g>{" "}
      </g>
      <g id="notion-avatar-glasses">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Glasses/ 3</title>{" "}
        <g
          id="Glasses/-3"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <g
            id="Group"
            transform="translate(293.000000, 488.000000)"
            stroke="#000000"
            strokeWidth="8"
          >
            {" "}
            <path
              d="M197.493245,10.4280671 C174.636102,27.3582996 188.604356,103.544346 244.477372,103.544346 C300.350388,103.544346 337.149222,42.6997481 325.747213,20.1024857 C314.345204,-2.49477675 220.350388,-6.50216547 197.493245,10.4280671 Z"
              id="Path"
            />{" "}
            <path
              d="M376.540864,10.4280671 C353.683721,27.3582996 367.651975,103.544346 423.524991,103.544346 C479.398007,103.544346 516.196841,42.6997481 504.794832,20.1024857 C493.392823,-2.49477675 399.398007,-6.50216547 376.540864,10.4280671 Z"
              id="Path"
              transform="translate(436.458153, 51.772173) scale(-1, 1) translate(-436.458153, -51.772173) "
            />{" "}
            <line x1="301.285714" y1="5.44186047" x2="392.714286" y2="5.44186047" id="Path" />{" "}
            <line x1="326.68254" y1="21.1627907" x2="367.31746" y2="21.1627907" id="Path" />{" "}
            <line
              x1="186.554557"
              y1="30.8015819"
              x2="1.25992802"
              y2="69.9860126"
              id="Path"
              transform="translate(94.259928, 50.646655) rotate(1.361411) translate(-94.259928, -50.646655) "
            />{" "}
          </g>{" "}
        </g>{" "}
      </g>
      <g id="notion-avatar-hair">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Hairstyle/ 11</title>{" "}
        <g
          id="Hairstyle/-11"
          stroke="none"
          strokeWidth="1"
          fill="none"
          fillRule="evenodd"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {" "}
          <path
            d="M287.145773,564.824988 L328.116663,564.824988 L366,655 C368,609 370.666667,578.666667 374,564 C377.333333,549.333333 386,536 400,524 C404.686858,511.205454 408.020191,498.538788 410,486 C411.979809,473.461212 412.646475,460.794546 412,448 C431.277968,442.027683 448.944635,435.027683 465,427 C481.055365,418.972317 496.055365,409.638984 510,399 C541.018923,414.567133 564.018923,423.900467 579,427 C598.333333,431 625.666667,431 661,427 C677,435 690.333333,444.666667 701,456 C711.666667,467.333333 719.333333,477 724,485 C739.337022,483.068501 749.003689,474.068501 753,458 C758.994467,433.897248 749.308457,421.45399 753,385 C755.461029,360.69734 761.794362,334.364006 772,306 C756.671455,311.760083 745.671455,315.093417 739,316 C713.953321,319.403591 695.432317,316 684,316 C636.89228,316 645,282 615,272 C595,265.333333 574.900668,265.39119 554.702003,272.17357 C537.058392,259.349997 518.824391,250.958807 500,247 C481.175609,243.041193 457.508942,242.041193 429,244 C432.618992,252.559514 429.952325,263.892847 421,278 C407.571512,299.160729 404,300 392,311 C380,322 362,318 347,335 C337,346.333333 333,359.666667 335,375 C327.529566,375.74088 320.196232,377.74088 313,381 C305.803768,384.25912 299.470434,389.592453 294,397 C316.094259,401.247038 325.477218,404.098045 322.148877,405.553022 C298.10323,416.064523 271.638366,440.518688 265,458 C256.983334,479.110894 264.365258,514.719224 287.145773,564.824988 Z"
            id="Path"
            stroke="#000000"
            strokeWidth="12"
            fill="#000000"
          />{" "}
        </g>{" "}
      </g>
      <g id="notion-avatar-accessories">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Accessories/ 0</title>{" "}
        <g id="Accessories/-0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" />{" "}
      </g>
      <g id="notion-avatar-details">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Details/ 0</title>{" "}
        <g id="Details/-0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" />{" "}
      </g>
      <g id="notion-avatar-beard">
        {" "}
        {/* ?xml version="1.0" encoding="UTF-8"?--> */} <title>Beard/ 0</title>{" "}
        <g id="Beard/-0" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd" />{" "}
      </g>{" "}
    </g>{" "}
  </svg>
)

export default FaceIcon
