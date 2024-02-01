import * as React from 'react'
import { useFilterTags, useRemoveFilterTag } from '../../hooks/useFilter';

export const TagsControl = () => {

    const filterTags = useFilterTags();
    const removeFilterTag = useRemoveFilterTag();

  return (
    <div className='tw-flex tw-flex-wrap tw-mt-4 tw-w-[calc(100vw-2rem)] tw-max-w-xs'>
    {
        filterTags.map(tag =>
            <div key={tag.id} className='tw-rounded-2xl tw-text-white tw-p-2 tw-px-4 tw-shadow-xl tw-card tw-mr-2 tw-mb-2' style={{ backgroundColor: tag.color }}>
                <div className="tw-card-actions tw-justify-end">
                    <label className="tw-btn tw-btn-xs tw-btn-circle tw-absolute tw--right-2 tw--top-2 tw-bg-white tw-text-gray-600" onClick={() => (removeFilterTag(tag.id))}>✕</label>
                </div><b>#{capitalizeFirstLetter(tag.name)}</b>
            </div>
        )
    }


</div>)
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}