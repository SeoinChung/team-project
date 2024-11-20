import React, { useState } from 'react';
import './FitnessEquipInfo.css';
import FitnessEquipGif from '../components/FitnessEquipGif';

export const equipmentDetails = [
    { name: "랫 풀 다운",
        description: "광배, 특히 등 상부 근육을 타겟으로 하여 세밀한 근육 발달을 위해 효과적이며, 초보자부터 전문가까지 손쉽게 사용할 수 있습니다. 자세 교정과 근력 향상에 도움이 됩니다.",
        exerciseInstructions: "1. 머신에 앉을 때 상체를 위치한 엉덩이보다 살짝만 뒤로 기울여 눕혀줍니다.\n2. 등을 펼 때 어깨에 힘을 주지 않고 자연스럽게 내림과 동시에 가슴을 내밉니다.\n3. 어깨너비보다 조금 넓게 그립을 잡고, 팔꿈치가 당겨오는 줄의 방향과 일진선이 되도록 바가 쇄골에 닿을 때까지 호흡을 내쉬며 당겨줍니다.\n4. 호흡을 들이마시며 시작 자세로 돌아옵니다.",
        warning:"1. 승모근에 힘을 주지 않고 아래로 떨어뜨린다고 생각하며 시작해야 합니다.\n2. 당겨올 때(수축할 때) 호흡을 들이마시면 어깨가 올라가 승모근에 긴장이 갈 수 있으니 주의해야 합니다.\n3. 팔을 완전히 펴면 어깨에 무리가 갈 수 있으니 주의해야 합니다.\n4. 그립을 잡는 손의 위치는 사람마다 다르므로 자극이 잘 오는 위치를 찾는 것도 좋습니다.",
        videos: [
            { 
                title: "랫 풀 다운 기본 운동법1", 
                thumbnail: "https://img.youtube.com/vi/MpVD4WMoewM/0.jpg", 
                videoLink: "https://youtu.be/MpVD4WMoewM?si=skzTuLV39comcAPp"
            },
            { 
                title: "랫 풀 다운 기본 운동법2", 
                thumbnail: "https://img.youtube.com/vi/OJevd3OyNNo/0.jpg", 
                videoLink: "https://youtu.be/OJevd3OyNNo?si=lPHbPa2pYv17W_tW&t=30"
            },
            {
                title: "랫 풀 다운 기본 운동법3",
                thumbnail: "https://img.youtube.com/vi/uucD6XSsL-k/0.jpg",
                videoLink: "https://youtube.com/shorts/uucD6XSsL-k?si=WXI69950dm0SbYUH"
            },
            {
                title: "랫 풀 다운 그립 별 자극부위",
                thumbnail: "https://img.youtube.com/vi/E7aOkectaw4/0.jpg",
                videoLink: "https://youtube.com/shorts/E7aOkectaw4?si=2ZecPWUdo8Z2IhPg"
            }
        ],
        images: "/images/lat-pull-down.jpeg"
    },
    { name: "케이블 스트레이트 암 풀 다운",
        description: "삼두근과 광배를 타겟으로 하여 효과적으로 발달시킬 수 있습니다. 팔을 올렸다 내리는 동작간의 부드러운 전환으로 관절에 부담을 덜 주고, 자연스러운 활동 범위 내에서 신체를 움직이게 하여 초보자들이 접근하기에 쉬운 운동입니다.",
        exerciseInstructions: "1. 다리를 어깨 너비만큼 벌립니다.\n 2. 그립을 팔꿈치를 살짝 굽힌 상태로 잡습니다.\n3. 무릎을 살짝 굽히고 허리는 곧게 펴 45도 정도로 상체를 기울입니다.\n4. 호흡을 내쉬면서 반원을 그리듯 바를 허벅지 쪽으로 끌어내립니다.\n5. 호흡을 마시며 원위치로 돌아갑니다.",
        warning: "1. 승모근에 힘이 들어가지 않도록 어깨는 아래로 끌어내리는 동시에 가슴은 위로 업시키듯 내밀어야 합니다.\n2. 광배근에 긴장을 유지시키며 천천히 이완시켜야 합니다.\n3. 수축과 이완 동작 시 팔꿈치는 살짝 구부린 상태로 동작을 진행해야 하며, 상체는 흔들리지 않아야 합니다.",
        videos: [
            { 
                title: "케이블 스트레이트 암 풀 다운 기본 운동법1", 
                thumbnail: "https://img.youtube.com/vi/C1_Yx8qPXRE/0.jpg", 
                videoLink: "https://youtu.be/C1_Yx8qPXRE?si=rFvxOyPfOXr2uAZR"
            },
            { 
                title: "케이블 스트레이트 암 풀 다운 기본 운동법2", 
                thumbnail: "https://img.youtube.com/vi/Jdyy0GNx4sc/0.jpg", 
                videoLink: "https://youtu.be/Jdyy0GNx4sc?si=8Z2fmbI2q5rMCAxo"
            },
            {
                title: "케이블 스트레이트 암 풀 다운 기본 운동법3", 
                thumbnail: "https://img.youtube.com/vi/YntwjLKHlLk/0.jpg", 
                videoLink: "https://youtu.be/YntwjLKHlLk?si=Tpzt3Z38GCTC72dm&t=15"
            },
            {
                title: "케이블 스트레이트 암 풀 다운 기본 운동법4", 
                thumbnail: "https://img.youtube.com/vi/cTckQ2sXQPM/0.jpg", 
                videoLink: "https://youtube.com/shorts/cTckQ2sXQPM?si=or77aF2bP3Fg28TN"
            }
        ],
        images: "/images/cable-arm-pulldown.jpeg"
    },
    { name: "체스트 프레스",
        description: "가슴 근육을 안정적으로 발달시키는 데 도움이 되며, 타 가슴 운동에 비해 관절에 부담을 더 적게 주어 초보자분들도 쉽게 단련할 수 있습니다.",
        exerciseInstructions: "1. 가슴을 내민다고 생각하며 허리를 세워 앉습니다.\n2. 두 손으로 그립을 잡아주고 허리를 살짝 아치 형태로 만들어주어 의자에 등이 닿지 않도록 합니다.\n3. 호흡을 내시며 팔꿈치가 완전히 펴지기 전까지 힘껏 밀어줍니다.\n4. 호흡을 들이쉬며 팔의 각도가 수직이 될 때까지만 이완시킵니다.",
        warning:"1. 팔꿈치를 완전히 펴면 무리가 갈 수 있으니 끝까지 펴지 않습니다.\n2. 수축 후 그립을 잡은 손을 일직선 방향으로 끌고와야 합니다.",
        videos: [
            { 
                title: "체스트 프레스 기본 운동법1", 
                thumbnail: "https://img.youtube.com/vi/CAt37ltbjTI/0.jpg", 
                videoLink: "https://youtu.be/CAt37ltbjTI?si=_U98ROx49DW7i_YQ&t=419"
            },
            { 
                title: "체스트 프레스 기본 운동법2", 
                thumbnail: "https://img.youtube.com/vi/UqlUZFZgczk/0.jpg", 
                videoLink: "https://youtu.be/UqlUZFZgczk?si=3c2ftg1sZreDSRva&t=475"
            },
            { 
                title: "체스트 프레스 기본 운동법3", 
                thumbnail: "https://img.youtube.com/vi/eLbsMnfoCq8/0.jpg", 
                videoLink: "https://youtube.com/shorts/eLbsMnfoCq8?si=X3VLPykMP2yfqfZT"
            },
            { 
                title: "체스트 프레스 기본 운동법4", 
                thumbnail: "https://img.youtube.com/vi/AKzdQPAEGMQ/0.jpg", 
                videoLink: "https://youtube.com/shorts/AKzdQPAEGMQ?si=Z24coSqSdbYl2V6i"
            }
        ],
        images: "/images/chest-press.jpeg"
    },
    { name: "백 익스텐션",
        description: "백 익스텐션은 주로 척추기립근을 대상으로 하는 운동으로, 이 운동은 하부 등 근육과 코어 힘을 강화하는데 탁월하며, 다른 허리 등 운동보다 코어 근육의 안정성을 강화하고 자세를 개선하는 데에도 많은 도움이 됩니다.",
        exerciseInstructions: "1. 허벅지 받침의 높이를 편한 위치에 놓습니다.\n2. 다리는 발 받침 위에 어깨너비로 놓으며 종아리 아래쪽을 다리걸이에 걸어 고정시킵니다.\n3. 팔은 허리 뒤에 올려놓거나 양팔을 교차해 어깨에 위치시킵니다.\n4. 허리와 가슴을 펴고 턱을 당긴 자세로 호흡을 내쉬며 천천히 허리를 숙여 상체를 아래로 내립니다.\n5. 호흡을 마시며 코어 힘으로 상체를 올려줍니다.",
        warning: "1. 상체를 들어올릴 때 허리 힘으로 들어올리는 것이 아닌 코어 힘으로 들어올려 주어야 합니다.\n2. 허리가 과신전되지 않는 위치까지만 상체를 들어올려줍니다.\n3. 허리가 말리지 않도록 가슴을 곧게 펴줍니다.",
        videos: [
            { 
                title: "백 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/3vKhZRSNm0Y/0.jpg", 
                videoLink: "https://youtu.be/3vKhZRSNm0Y?si=yR4Lz-BwTp22ptup&t=602"
            },
            { 
                title: "백 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/u6hMWk8zD_4/0.jpg", 
                videoLink: "https://youtu.be/u6hMWk8zD_4?si=9xUpFUbWpANuTg2O&t=57"
            },
            { 
                title: "백 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/JekuOb9yctw/0.jpg", 
                videoLink: "https://youtube.com/shorts/JekuOb9yctw?si=J_1JkdKnUK-TuNYg"
            },
            { 
                title: "백 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/j8jm32Ej1Hk/0.jpg", 
                videoLink: "https://youtube.com/shorts/j8jm32Ej1Hk?si=BEQmSqX1BMa4tW-T"
            }
        ],
        images: "/images/back-extension.jpeg"
    },
    { name: "리버스 하이퍼(백) 익스텐션",
        description: "허리와 엉덩이 근육을 강화하는 데 도움을 주며, 상체를 고정시킨 상태에서 골반과 허리를 움직이므로 허리의 과신전에 관해서 안전합니다.",
        exerciseInstructions: "1. 발목 패드를 발목보다 살짝 위쪽에 위치하도록 각도를 맞춰줍니다.\n2. 손잡이를 잡고 패드 아래쪽에 고관절 뼈가 맞닿도록 엎드려 누워줍니다.\n3. 발목 패드에 두 다리를 댄 상태에서 호흡을 내쉬며 기립근과 둔근을 이용하여 다리를 들어 올려줍니다.\n4. 호흡을 들이쉬며 다리를 내려줍니다.",
        warning: "1. 다리를 들어올릴 때 허리가 과신전되지 않도록 합니다.\n2. 패드를 던지는 느낌으로 힘차게 올리면 무릎과 허리에 무리가 갈 수 있으므로 적당한 속도로 수축시켜줍니다.",
        videos: [
            { 
                title: "리버스 하이퍼(백) 익스텐션 머신 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/6I0NiRc6yww/0.jpg", 
                videoLink: "https://youtu.be/6I0NiRc6yww?si=KZFNonABRP2XEMWa"
            },
            { 
                title: "리버스 하이퍼(백) 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/kndkQhbvgTU/0.jpg", 
                videoLink: "https://youtu.be/kndkQhbvgTU?si=nyB37vrbz_NVnZX3&t=30"
            },
            { 
                title: "리버스 하이퍼(백) 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/jUSo_NUnpzo/0.jpg", 
                videoLink: "https://youtu.be/jUSo_NUnpzo?si=YewWCm8VS-lfuyNP&t=919"
            },
            { 
                title: "리버스 하이퍼(백) 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/fJtfxLTyml0/0.jpg", 
                videoLink: "https://youtube.com/shorts/fJtfxLTyml0?si=_cMBPIZdM-xRqD3K"
            }
        ],
        images: "/images/reverse-hyper-extension.jpeg"
    },
    { name: "치닝디핑 (치닝)",
        description: "딥스와 턱걸이를 결합한 운동으로, 딥스는 가슴과 이두근을 집중적으로 자극하는 운동입니다. 턱걸이는 광배, 등 상부, 이두근을 발달시키는 데 효과적인 운동입니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "치닝디핑(치닝) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            },
            { 
                title: "치닝디핑(치닝) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            },
            { 
                title: "치닝디핑(치닝) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            },
            { 
                title: "치닝디핑(치닝) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ],
        images: "/images/chinning-dipping1.jpeg"
    },
    { name: "치닝디핑 (디핑)",
        description: "딥스와 턱걸이를 결합한 운동으로, 딥스는 가슴과 이두근을 집중적으로 자극하는 운동입니다. 턱걸이는 광배, 등 상부, 이두근을 발달시키는 데 효과적인 운동입니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "치닝디핑(디핑) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            },
            { 
                title: "치닝디핑(디핑) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            },
            { 
                title: "치닝디핑(디핑) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            },
            { 
                title: "치닝디핑(디핑) 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ],
        images: "/images/chinning_dipping2.jpg"
    },
    { name: "시티드 레그 프레스",
        description: "시티드 레그 프레스는 하체를 안정적으로 단련하는 데 효과적이며, 특히 대퇴사두근과 하복부 근육을 강화하는 데 효과적입니다. 무릎과 고관절에 직접적인 부담을 줄일 수 있는 자세의 하체 운동입니다.",
        exerciseInstructions: "1. 몸을 머신 중앙에 위치시키고, 발판 중앙에 발을 올려줍니다.\n2. 다리는 어꺠너비로 벌려주시고, 발끝은 30도정도로 바깥을 보게 합니다.\n3. 가슴은 펴고, 허리는 살짝 아치 형태로 복부에 긴장감을 줍니다.\n4. 호흡을 들이마시며 허벅지와 몸통이 수직이 될 때까지 굽혀줍니다.\n5. 호흡을 내쉬며 무릎이 다 펴지기 전까지만 밀어줍니다.",
        warning:"1. 발판 중앙보다 위쪽에 발을 위치시키면 허벅지 뒷쪽에 자극을 줄 수 있으며, 아래쪽에 발을 위치시키면 허벅지 앞쪽에 자극을 줄 수 있습니다.\n2. 무릎이 완전히 펴지지 않도록 해야합니다.\n3. 무릎이 벌어지면 안됩니다.",
        videos: [
            { 
                title: "시티드 레그 프레스 기본 운동법 1", 
                thumbnail: "https://img.youtube.com/vi/UokTSaDsk_A/0.jpg", 
                videoLink: "https://youtu.be/UokTSaDsk_A?si=bkgedGJ30L7Ns4Tb"
            },
            { 
                title: "시티드 레그 프레스 기본 운동법 2", 
                thumbnail: "https://img.youtube.com/vi/eK_4Mm7lAb0/0.jpg", 
                videoLink: "https://youtube.com/shorts/eK_4Mm7lAb0?si=bQbB1gdD6MWb94Vx"
            },
            { 
                title: "시티드 레그 프레스 기본 운동법 3", 
                thumbnail: "https://img.youtube.com/vi/srwB2HUrVAM/0.jpg", 
                videoLink: "https://youtube.com/shorts/srwB2HUrVAM?si=BaMghI8BqBavszup"
            },
            { 
                title: "시티드 레그 프레스 기본 운동법 4", 
                thumbnail: "https://img.youtube.com/vi/6k7fBUE3rec/0.jpg", 
                videoLink: "https://youtube.com/shorts/6k7fBUE3rec?si=wlGun9rigHq8Q4_p"
            }
        ],
        images: "/images/leg-press.jpeg"
    },
    { name: "스텝퍼",
        description: "유산소 운동 중 시간 대비 칼로리 소모가 많은 운동으로, 실제 계단을 올라가는 듯한 움직임을 갖고 있는 운동입니다. 심폐 지구력을 향상시키고 하체 근력을 강화시켜줍니다.",
        exerciseInstructions: "1. 적당한 속도로 설정한 뒤 상체를 살짝 앞으로 기울인 자세를 취합니다.\n2. 발판을 천천히 뒷꿈치로 누르며 계단을 올라갑니다.\n3. 양쪽 발을 번갈아가며 운동을 진행합니다.",
        warning: "1. 계단을 오를 때 발의 무게중심을 앞쪽에 두면 운동효과가 떨어지기 때문에 뒷꿈치가 발판에 먼저 닿도록 올라가야 합니다.\n2. 상체를 일직선으로 펴면 허리가 무리가 갈 수 있으니 살짝 기울인 자세를 유지해야 합니다.",
        videos: [
            { 
                title: "스텝퍼 운동 효과1", 
                thumbnail: "https://img.youtube.com/vi/cbaDfVxDMig/0.jpg", 
                videoLink: "https://youtu.be/cbaDfVxDMig?si=6hL72lIjboyPHhGY&t=256"
            },
            { 
                title: "스텝퍼 기본 운동법2", 
                thumbnail: "https://img.youtube.com/vi//0.jpg", 
                videoLink: ""
            },
            { 
                title: "스텝퍼 기본 운동법3", 
                thumbnail: "https://img.youtube.com/vi//0.jpg", 
                videoLink: ""
            },
            {
                title: "스텝퍼 기본 운동법4", 
                thumbnail: "https://img.youtube.com/vi/GscAz382IBw/0.jpg", 
                videoLink: "https://youtube.com/shorts/GscAz382IBw?si=K2qrvaLWKh0mx-6i"
            }
        ],
        images: "/images/stepper.jpeg"
    },
    { name: "런닝머신",
        description: "가장 대중적인 유산소 운동 기구로 심폐 지구력 향상과 체지방 감량에 효과적입니다. 다양한 속도와 경사 조절 기능을 통해 맞춤형 워크아웃이 가능합니다.",
        exerciseInstructions: "1. 자신에게 맞는 적당한 속도로 설정합니다.\n2. 시선을 앞을 향하도록 하고, 어깨의 힘을 뺀 상태로 팔을 앞뒤로 흔들면서 발 뒷꿈치부터 닿도록 걷습니다.\n3. 숨을 들어마시는 것은 코로 하며 내쉬는 것은 입으로 합니다.",
        warning:"1. 전용 런닝화를 신는 것이 좋습니다.\n2. 처음부터 빠른 속도로 두는 것이 아니라 천천히 늘려갑니다.\n3. 유산소 운동을 하기 전 햄스트링을 충분히 스트레칭 해주는 것이 좋습니다.",
        videos: [
            { 
                title: "런닝머신 기본 운동법 1", 
                thumbnail: "https://img.youtube.com/vi/7eku-lsS0AM/0.jpg", 
                videoLink: "https://youtu.be/7eku-lsS0AM?si=lPMDLKFvUGlUgNhD"
            },
            { 
                title: "런닝머신 기본 운동법 2", 
                thumbnail: "https://img.youtube.com/vi/d8Jm_6TZxL0/0.jpg", 
                videoLink: "https://youtube.com/shorts/d8Jm_6TZxL0?si=UKqS_YSDYFG74_My"
            },
            { 
                title: "런닝머신 기본 운동법 3", 
                thumbnail: "https://img.youtube.com/vi/lCS5rXtm6qk/0.jpg", 
                videoLink: "https://youtube.com/shorts/lCS5rXtm6qk?si=hkoOzL0PZ_ZGlwww"
            },
            { 
                title: "런닝머신 기본 운동법 4", 
                thumbnail: "https://img.youtube.com/vi/Kk-IConBOf0/0.jpg", 
                videoLink: "https://youtube.com/shorts/Kk-IConBOf0?si=zx08KbGax8FROJjG"
            }
        ],
        images: "/images/treadmill.jpeg"
    },
    { name: "일립티컬 머신",
        description: "채워주세요.",
        exerciseInstructions: "채워주세요",
        warning:"채워주세요",
        videos: [
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            }
        ],
        images: "/images/elliptical_machine.jpg"
    },
    { name: "싸이클",
        description: "채워주세요.",
        exerciseInstructions: "채워주세요",
        warning:"채워주세요",
        videos: [
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            }
        ],
        images: "/images/cycle.jpg"
    },
    { name: "레그 익스텐션",
        description: "채워주세요.",
        exerciseInstructions: "채워주세요",
        warning:"채워주세요",
        videos: [
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            }
        ],
        images: "/images/leg_extension.jpg"
    },
    { name: "이너타이",
        description: "채워주세요.",
        exerciseInstructions: "채워주세요",
        warning:"채워주세요",
        videos: [
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            }
        ],
        images: "/images/inner_thigh.jpg"
    },
    { name: "아웃타이",
        description: "채워주세요.",
        exerciseInstructions: "채워주세요",
        warning:"채워주세요",
        videos: [
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            },
            { 
                title: "공백", 
                thumbnail: "", 
                videoLink: ""
            }
        ],
        images: "/images/out_thigh.jpg"
    }
];

function FitnessEquipInfo() {
    const [selectedEquipment, setSelectedEquipment] = useState(equipmentDetails[0]);
    const [showVideos, setShowVideos] = useState(false);

    const handleWatchViewToggle = () => {
        setShowVideos((prevShowVideos) => !prevShowVideos);
    };

    const goToDipping = () => {
        const dippingEquipment = equipmentDetails.find(
            (equip) => equip.name === "치닝디핑 (디핑)"
        );
        if (dippingEquipment) {
            setSelectedEquipment(dippingEquipment);
        }
    };

    const goToChinning = () => {
        const chinningEquipment = equipmentDetails.find(
            (equip) => equip.name === "치닝디핑 (치닝)"
        );
        if (chinningEquipment) {
            setSelectedEquipment(chinningEquipment);
        }
    };

    const goToOut = () => {
        const outthighEquipment = equipmentDetails.find(
            (equip) => equip.name === "아웃타이"
        );
        if (outthighEquipment) {
            setSelectedEquipment(outthighEquipment);
        }
    };

    const goToInner = () => {
        const innerthighEquipment = equipmentDetails.find(
            (equip) => equip.name === "이너타이"
        );
        if (innerthighEquipment) {
            setSelectedEquipment(innerthighEquipment);
        }
    };

    return (
        <div className="container">
            <h2 className="title">운동기구 상세 정보</h2>
            <div className="detail-box">
                <h3>{selectedEquipment.name}</h3>

                {selectedEquipment.name === "치닝디핑 (치닝)" && (
                    <button className="action-button" onClick={goToDipping}>
                        치닝디핑(디핑) 운동법
                    </button>
                )}

                {selectedEquipment.name === "치닝디핑 (디핑)" && (
                    <button className="action-button" onClick={goToChinning}>
                        치닝디핑(치닝) 운동법
                    </button>
                )}

                {selectedEquipment.name === "이너타이" && (
                    <button className="action-button" onClick={goToOut}>
                        아웃타이 운동법
                    </button>
                )}

                {selectedEquipment.name === "아웃타이" && (
                    <button className="action-button" onClick={goToInner}>
                        이너타이 바꾸기
                    </button>
                )}

                <p style={{ whiteSpace: 'pre-line' }}>{selectedEquipment.description}</p>
                <FitnessEquipGif equipmentName={selectedEquipment.name} />

                <h4>운동 방법:</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{selectedEquipment.exerciseInstructions}</p>

                <h4 style={{ color: "#FF5A5A" }}>주의 사항:</h4>
                <p style={{ whiteSpace: 'pre-line' }}>{selectedEquipment.warning}</p>

                <h4>참고 영상:</h4>
                <button
                onClick={handleWatchViewToggle}
                className="watch-view-button"
                style={{
                    backgroundColor: '',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    padding: '10px 15px',
                    cursor: 'pointer',
                    marginBottom: '10px'
                }}
                >
                {showVideos ? "영상 숨기기" : "영상 보기"}
                </button>

                {showVideos && ( 
                    <div className="video-thumbnails">
                        {(selectedEquipment.videos || []).map((video, index) => (
                            <a
                            key={index}
                            href={video.videoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="video-link"
                            >
                            <img
                                src={video.thumbnail}
                                alt={video.title}
                                className="video-thumbnail"
                                style={{
                                    width: '128px',
                                    height: 'auto',
                                    margin: '5px',
                                    borderRadius: '8px'
                                }}
                            />
                        </a>
                    ))}
                    </div>
                )}
            </div>
            <h4>다른 운동기구 선택하기:</h4>
            <div className="button-group">
                {equipmentDetails.map((equip, index) => (
                    <button 
                        key={index} 
                        onClick={() => {
                            setSelectedEquipment(equip);
                            window.scrollTo({ // 화면을 맨 위로 스크롤
                                top: 0,
                                behavior: "smooth" // 부드러운 스크롤
                              });
                        }}
                        className={`nav-button ${selectedEquipment.name === equip.name ? 'active' : ''}`}
                    >
                        <img 
                            src={equip.images} 
                            alt={equip.name}
                            className="equipment-image-button"
                            style={{ width: '100px', height: '100px' }} 
                        />
                        <p>{equip.name}</p>
                    </button>
                ))}
            </div>
        </div>
    )
}

export default FitnessEquipInfo;