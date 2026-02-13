import tool_type from '../data/tool_type';
import enchant_list from '../data/enchant_list';

export const useCommandGenerator = () => {
    const generateCommand = ({viewTool, viewMaterial, viewEnchant, modeIdx, Variable}) => {
        // 에러 체크
        if (viewTool.length === 0) {
            return {success: false, title: "Select Tool", msg: "Please select a tool", icon: "barrier"};
        }

        const toolItem = tool_type.find((t) => t.name === viewTool[0]);

        // 재료 필요 여부 검사
        if (toolItem && !toolItem.stand_alone && viewMaterial.length === 0) {
            return {success: false, title: "Select Material", msg: "Material required for this tool", icon: "barrier"};
        }
        if (toolItem && toolItem.stand_alone && viewMaterial.length !== 0) {
            return {success: false, title: "Remove Material", msg: "This tool cannot have a material", icon: "barrier"};
        }

        // 인첸트 ID 추출
        const customEnchants = viewEnchant.map(name => {
            const found = enchant_list.find(e => e.name === name);
            return found ? found.origin : null;
        }).filter(Boolean);

        let resultStr = "";

        // 아이템 ID 생성 (예: diamond_sword)
        const itemId = toolItem.stand_alone ? toolItem.name : `${viewMaterial[0]}_${toolItem.name}`;

        // 모드에 따른 명령어 생성
        if (modeIdx === 0) { // Single
            resultStr = `${Variable.str_front}${itemId}`;
        } else { // Multi
            resultStr = `/give ${Variable.nickname} ${itemId} 1 `;
        }

        // 인첸트 구문 추가
        if (customEnchants.length > 0) {
            resultStr += `${Variable.str_second}${customEnchants.join(",")}${Variable.str_end}`;
        }

        return {success: true, command: resultStr};
    };

    return {generateCommand};
};