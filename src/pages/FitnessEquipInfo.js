import React, { useState } from 'react';
import './FitnessEquipInfo.css';
import FitnessEquipGif from '../components/FitnessEquipGif';

const equipmentDetails = [
    { name: "머신 레그프레스",
        description: "머신 레그프레스는 하체를 안정적으로 단련하는 데 효과적이며, 특히 대퇴사두근과 하복부 근육을 강화하는 데 효과적입니다. 무릎과 고관절에 직접적인 부담을 줄일 수 있는 자세의 하체 운동입니다.",
        exerciseInstructions: "1. 적절한 무게를 설정하세요.\n2. 발을 고정하고 무릎을 구부렸다가 펴면서 다리를 천천히 밀어냅니다.\n3. 반복 횟수를 설정하고 실시합니다.",
        videos: [
            { 
                title: "레그프레스 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "케이블 스트레이트 암 풀 다운",
        description: "삼두근과 광배를 타겟으로 하여 효과적으로 발달시킬 수 있습니다. 팔을 올렸다 내리는 동작간의 부드러운 전환으로 관절에 부담을 덜 주고, 자연스러운 활동 범위 내에서 신체를 움직이게 하여 초보자들이 접근하기에 쉬운 운동입니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "케이블 스트레이트 암 풀 다운 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "랫풀다운",
        description: "광배, 특히 등 상부 근육을 타겟으로 하여 세밀한 근육 발달을 위해 효과적이며, 초보자부터 전문가까지 손쉽게 사용할 수 있습니다. 자세 교정과 근력 향상에 도움이 됩니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "랫풀다운 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "체스트프레스",
        description: "가슴 근육을 안정적으로 발달시키는 데 도움이 되며, 타 가슴 운동에 비해 관절에 부담을 더 적게 주어 초보자분들도 쉽게 단련할 수 있습니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "체스트프레스 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "리버스 하이퍼 익스텐션",
        description: "허리와 엉덩이 근육을 강화하는 데 도움을 주며, 상체를 고정시킨 상태에서 골반과 허리를 움직이므로 허리의 과신전에 관해서 안전합니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "리버스 하이퍼 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "백 익스텐션",
        description: "백 익스텐션은 주로 척추기립근을 대상으로 하는 운동으로, 이 운동은 하부 등 근육을 강화하는데 탁월하며, 다른 허리 등 운동보다 코어 근육의 안정성을 강화하고 자세를 개선하는 데에도 많은 도움이 됩니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "백 익스텐션 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "스텝퍼",
        description: "유산소 운동 중 시간 대비 칼로리 소모가 많은 운동으로, 실제 계단을 올라가는 듯한 움직임을 갖고 있는 운동입니다. 심폐 지구력을 향상시키고 하체 근력을 강화시켜줍니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "스텝퍼 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "치닝디핑",
        description: "딥스와 턱걸이를 결합한 운동으로, 딥스는 가슴과 이두근을 집중적으로 자극하는 운동입니다. 턱걸이는 광배, 등 상부, 이두근을 발달시키는 데 효과적인 운동입니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "치닝디핑 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    },
    { name: "런닝머신",
        description: "가장 대중적인 유산소 운동 기구로 심폐 지구력 향상과 체지방 감량에 효과적입니다. 다양한 속도와 경사 조절 기능을 통해 맞춤형 워크아웃이 가능합니다.",
        exerciseInstructions: "",
        videos: [
            { 
                title: "런닝머신 기본 운동법", 
                thumbnail: "https://img.youtube.com/vi/1LlO_HosaLw/0.jpg", 
                videoLink: "https://youtu.be/1LlO_HosaLw?si=TzjvW8UUjxcxH1Xa"
            }
        ]
    }
];


function FitnessEquipInfo() {
    const [selectedEquipment, setSelectedEquipment] = useState(equipmentDetails[0]);

    return (
        <div className="container">
            <h2 className="title">운동기구 상세 정보</h2>
            <div 
                className="detail-box"
                style={{
                    border: '1px solid #ccc',  // 모든 운동기구에 동일한 테두리 스타일 적용
                    borderRadius: '10px',
                    padding: '20px',
                    width: '300px',  // 박스 크기를 설정
                    margin: '0 auto', // 가운데 정렬
                    textAlign: 'center'
                }}
            >
                <h3>{selectedEquipment.name}</h3>
                <p>{selectedEquipment.description}</p>
                <FitnessEquipGif equipmentName={selectedEquipment.name}></FitnessEquipGif>

                <h4>운동 방법:</h4>
                <p>{selectedEquipment.exerciseInstructions}</p>

                <h4>참고 영상:</h4>
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
                                style={{ width: '100px', height: 'auto', margin: '10px' }}
                            />
                        </a>
                    ))}
                </div>
            </div>
            <h4>다른 운동기구 선택하기:</h4>
            <ul className="equipment-list">
                {equipmentDetails.map((equip, index) => (
                    <li 
                        key={index} 
                        onClick={() => setSelectedEquipment(equip)} 
                        className="equipment-item"
                    >
                        {equip.name}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FitnessEquipInfo;
