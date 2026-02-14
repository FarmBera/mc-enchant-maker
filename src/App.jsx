import React, {useState} from "react";
import "./App.css";

import tool_type from "./data/tool_type";
import tool_material from "./data/tool_material";
import enchant_list from "./data/enchant_list";
import Variable from "./data/data";

// components
import Icon from "./components/ui/Icon";
import Modal from "./components/ui/Modal";
import Header from "./components/layout/Header";

/** reusable selection grid components */
const SelectionGrid = ({items, type, onClick, selectedItems}) => (
    <ul className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-2 lg:grid-cols-3 gap-3 p-2 overflow-y-auto max-h-87.5">
        {items.map((item, idx) => {
            // check item is object or string
            const name = typeof item === 'object' ? item.name : item;
            const isSelected = selectedItems.includes(name);

            return (<li
                key={idx}
                onClick={() => onClick(name)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl cursor-pointer transition-all duration-200 border-2 select-none
            ${isSelected ? 'bg-indigo-50 border-indigo-400 shadow-md transform scale-[1.02]' : 'bg-white border-slate-100 hover:border-indigo-200 hover:shadow-sm hover:-translate-y-0.5'}
          `}>
                <Icon name={type === "enchant" ? "enchanted_book" : name} size={42}/>
                <span
                    className="mt-2 text-xs font-bold text-slate-700 text-center wrap-break-word w-full leading-tight">
                    {name.charAt(0).toUpperCase() + name.slice(1)}
                </span>
            </li>);
        })}
    </ul>);

/** main component */
function App() {
    const [viewMaterial, setViewMaterial] = useState([]);
    const [viewTool, setViewTool] = useState([]);
    const [viewEnchant, setViewEnchant] = useState([]);

    const [modalState, setModalState] = useState({
        show: false, title: "", msg: "", color: "blue", image: '', duration: 3
    });
    const [filter, setFilter] = useState({chkbox1: true, chkbox2: false, chkbox3: false, chkbox4: false});
    const [isMultiMode, setIsMultiMode] = useState(false);

    /** item click handler
     * @param val : string ; selected item's name
     * @param type : string ; selected item's type
     */
    const handleItemClick = (val, type) => {
        if (type === "tool") setViewTool([val]);
        if (type === "material") setViewMaterial([val]);
        if (type === "enchant") setViewEnchant(prev => prev.includes(val) ? prev.filter(i => i !== val) : [...prev, val]);
    };

    const clearSelection = (type) => {
        if (type === 'all') {
            setViewTool([]);
            setViewMaterial([]);
            setViewEnchant([]);
        } else if (type === 'material') {
            setViewMaterial([]);
        } else if (type === 'tool') {
            setViewTool([]);
        } else if (type === 'enchant') {
            setViewEnchant([]);
        }
    };

    // command creation
    const handleCreate = async () => {
        if (viewTool.length === 0) {
            setModalState({
                show: true, title: "Select Tool", msg: "Please select a tool first.", color: "red", image: "barrier"
            });
            return;
        }

        const toolItem = tool_type.find((t) => t.name === viewTool[0]);
        if (toolItem && !toolItem.stand_alone && viewMaterial.length === 0) {
            setModalState({
                show: true,
                title: "Select Material",
                msg: "This tool requires a material to be selected.",
                color: "red",
                image: "barrier"
            });
            return;
        }
        if (toolItem && toolItem.stand_alone && viewMaterial.length !== 0) {
            setModalState({
                show: true,
                title: "Remove Material",
                msg: "This tool cannot have a material. Please clear it.",
                color: "red",
                image: "barrier"
            });
            return;
        }

        const customEnchants = viewEnchant.map(name => {
            const found = enchant_list.find(e => e.name === name);
            return found ? found.origin : null;
        }).filter(Boolean);

        let resultStr;//command output

        // pop-up modal image var
        let enchanted = false;
        let image_name = '';

        const itemId = toolItem.stand_alone ? toolItem.name : `${viewMaterial[0]}_${toolItem.name}`;

        if (isMultiMode) {
            resultStr = `/give ${Variable.nickname} ${itemId} 1 `;
        } else {
            resultStr = `${Variable.str_front}${itemId}`;
        }

        if (customEnchants.length > 0) {
            enchanted = true
            resultStr += `${Variable.str_second}${customEnchants.join(",")}${Variable.str_end}`;
        }

        // image name decision
        if (enchanted) image_name += 'enchanted_'
        if (viewMaterial) image_name += `${viewMaterial[0]}_`
        image_name += toolItem.name

        // copy to clipboard
        try {
            await navigator.clipboard.writeText(resultStr);
            setModalState({
                show: true,
                title: "Copied Successfully!",
                msg: resultStr,
                color: "green",
                duration: 5,
                image: image_name
            });
        } catch {
            setModalState({
                show: true,
                title: "Copy Failed",
                msg: `Generated Command:\n${resultStr}\n\n(Browser does not support auto-copy)`,
                color: "orange"
            });
        }
    };

    // filter logic
    const getFilteredEnchants = () => {
        if (enchant_list.length === 0) return [];
        return enchant_list.filter((enchant) => {
            if (filter.chkbox1 && enchant.name === enchant.id) return true;
            if (filter.chkbox2 && enchant.name !== enchant.id && enchant.lvl <= 10) return true;
            if (filter.chkbox3 && enchant.lvl > 10 && enchant.lvl <= 100) return true;
            if (filter.chkbox4 && enchant.lvl > 100) return true;
            return false;
        });
    };

    const toFirstUpper = (name) => name.charAt(0).toUpperCase() + name.slice(1)

    return (<div className="font-cst min-h-screen bg-slate-50 text-slate-800 pb-10">
        <Modal
            {...modalState}
            onClose={() => setModalState(prev => ({...prev, show: false}))}
        />

        {/* header */}
        <Header/>

        <main className="max-w-7xl mx-auto px-4 space-y-6">
            {/* preview section (top) */}
            <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
                <h3 className="text-xl font-bold text-slate-800 mb-4 pb-2 border-b-2 border-slate-100">Command
                    Preview</h3>
                <div
                    className="flex flex-wrap items-center justify-center gap-4 min-h-35 bg-slate-50 rounded-xl p-6 border-dashed border-2 border-slate-300">

                    {/* material */}
                    {viewMaterial.length > 0 && (<div
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center w-28 transition-transform transform hover:scale-105">
                        <Icon name={viewMaterial[0]} size={56}/>
                        <span
                            className="text-md mt-3 font-bold text-slate-700 text-center wrap-break-word w-full leading-tight">{toFirstUpper(viewMaterial[0])}</span>
                    </div>)}

                    {/* plus sign */}
                    {viewMaterial.length > 0 && viewTool.length > 0 &&
                        <span className='text-slate-400 font-bold text-4xl mx-2'>+</span>}

                    {/* tool */}
                    {viewTool.length > 0 && (<div
                        className="bg-white p-4 rounded-xl shadow-sm border border-slate-200 flex flex-col items-center justify-center w-32 transition-transform transform hover:scale-105">
                        <Icon name={viewTool[0]} size={56}/>
                        <span
                            className="text-md mt-3 font-bold text-slate-700 text-center wrap-break-word w-full leading-tight">{toFirstUpper(viewTool[0])}</span>
                    </div>)}

                    {/* WITH sign */}
                    {(viewTool.length > 0 || viewMaterial.length > 0) && viewEnchant.length > 0 &&
                        <span className="text-slate-400 font-bold text-xl mx-2 tracking-widest">WITH</span>}

                    {/* enchant list */}
                    {viewEnchant.map((each) => (<div key={each}
                                                     className="bg-indigo-50 p-2 rounded-xl border border-indigo-200 flex flex-col items-center justify-center w-32 relative group">
                        <button
                            onClick={() => handleItemClick(each, 'enchant')}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-8 h-8 text-xl flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                        >
                            X
                        </button>
                        <Icon name="enchanted_book" size={40}/>
                        <span
                            className="text-sm mt-2 text-indigo-900 font-bold text-center wrap-break-word w-full leading-tight">{toFirstUpper(each)}</span>
                    </div>))}

                    {viewMaterial.length === 0 && viewTool.length === 0 && viewEnchant.length === 0 && (<span
                        className="text-slate-400 font-medium">Select items from below to build your tool...</span>)}
                </div>
            </section>

            {/* control buttons (mid) */}
            <section
                className="flex flex-col lg:flex-row justify-between items-center bg-white p-4 rounded-xl shadow-sm border border-slate-200 gap-4">
                <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
                    <button
                        onClick={() => setIsMultiMode(!isMultiMode)}
                        className={`px-5 py-2.5 rounded-lg font-bold transition-all whitespace-nowrap w-full sm:w-auto ${isMultiMode ? 'bg-indigo-600 text-white shadow-md' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}
                    >
                        Mode: {isMultiMode ? "Multiplayer (/give)" : "Singleplayer"}
                    </button>

                    <div
                        className="flex flex-wrap items-center justify-center gap-4 bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 w-full sm:w-auto">
                        <span className="text-sm font-bold text-slate-600 mr-2">Filters:</span>
                        {[{id: 'chkbox1', label: 'Survival'}, {id: 'chkbox2', label: 'Lv.10'}, {
                            id: 'chkbox3', label: 'Lv.100'
                        }, {id: 'chkbox4', label: 'Inf'}].map((f) => (
                            <label key={f.id} className="flex items-center space-x-1.5 cursor-pointer select-none">
                                <input
                                    type="checkbox"
                                    checked={filter[f.id]}
                                    onChange={(e) => setFilter({...filter, [f.id]: e.target.checked})}
                                    className="w-4 h-4 rounded text-indigo-600 border-slate-300 focus:ring-indigo-500 transition-colors"
                                />
                                <span className="text-sm font-medium text-slate-700">{f.label}</span>
                            </label>))}
                    </div>
                </div>

                <div className="flex gap-3 w-full lg:w-auto justify-end">
                    <button
                        onClick={() => clearSelection('all')}
                        className="px-5 py-2.5 text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors font-bold whitespace-nowrap"
                    >
                        Clear All
                    </button>
                    <button
                        onClick={handleCreate}
                        className="px-8 py-2.5 bg-green-500 text-white rounded-lg shadow-md hover:bg-green-600 hover:shadow-lg transition-all active:scale-95 font-black whitespace-nowrap"
                    >
                        Create Command
                    </button>
                </div>
            </section>

            {/* selection grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">

                {/* material */}
                <section
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col h-full">
                    <div className="flex justify-between items-end mb-4 pb-2 border-b border-slate-100">
                        <h3 className="text-xl font-black text-slate-800">Material</h3>
                        <button onClick={() => clearSelection('material')}
                                className="text-md font-bold text-red-400 hover:text-red-600 uppercase tracking-wider">Clear
                        </button>
                    </div>
                    <div className="flex-1">
                        <SelectionGrid items={tool_material} type="material"
                                       onClick={(val) => handleItemClick(val, 'material')}
                                       selectedItems={viewMaterial}/>
                    </div>
                </section>

                {/* tool types */}
                <section
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col h-full">
                    <div className="flex justify-between items-end mb-4 pb-2 border-b border-slate-100">
                        <h3 className="text-xl font-black text-slate-800">Tool Type</h3>
                        <button onClick={() => clearSelection('tool')}
                                className="text-md font-bold text-red-400 hover:text-red-600 uppercase tracking-wider">Clear
                        </button>
                    </div>
                    <div className="flex-1">
                        <SelectionGrid items={tool_type} type="tool" onClick={(val) => handleItemClick(val, 'tool')}
                                       selectedItems={viewTool}/>
                    </div>
                </section>

                {/* enchantments */}
                <section
                    className="bg-white rounded-2xl shadow-sm border border-slate-200 p-5 flex flex-col h-full">
                    <div className="flex justify-between items-end mb-4 pb-2 border-b border-slate-100">
                        <h3 className="text-xl font-black text-slate-800">Enchantments</h3>
                        <button onClick={() => clearSelection('enchant')}
                                className="text-md font-bold text-red-400 hover:text-red-600 uppercase tracking-wider">Clear
                        </button>
                    </div>
                    <div className="flex-1">
                        {getFilteredEnchants().length > 0 ? (<SelectionGrid items={getFilteredEnchants()} type="enchant"
                                                                            onClick={(val) => handleItemClick(val, 'enchant')}
                                                                            selectedItems={viewEnchant}/>) : (<div
                            className="h-full flex items-center justify-center text-slate-400 font-medium py-10">
                            No enchantments match filters.
                        </div>)}
                    </div>
                </section>

            </div>
        </main>
    </div>);
}

export default App;