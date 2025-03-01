import React from 'react'
import Button from '@components/forms/Button/Button'
import { getHumanReadableDate } from '@utils/helpers/date.helpers'

const History = ({ historyData, onDeleteClick }) => {
    return (
        <div className="px-8 py-6 my-8 bg-white rounded-lg overflow-hidden shadow-lg w-full max-w-4xl lg:min-w-4xl md:min-w-xl">
            <details className="group">
                <summary className="flex items-center justify-between p-4 cursor-pointer bg-gray-50 rounded-lg hover:bg-gray-200">
                    <span className="font-medium">History</span>
                    <svg className="w-5 h-5 transform transition-transform group-open:rotate-180" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
                    </svg>
                </summary>
                <div className="mt-4 pb-4 text-gray-700">
                    <div className="">
                        {historyData.length > 0 ? (
                            <div className="bg-gray-50 text-sm">
                                {historyData.map((item) => (
                                    <div key={item.id} className="border-b border-gray-300 px-4 py-2">
                                        <p className="mb-2 break-all"><span className="text-amber-500">{ "> " }</span> {item.input} <br /></p>
                                        <p className="mb-2 break-all"><span className="text-green-500">{ "> " }</span> {item.output} <br /></p>
                                        <span className="text-gray-600 text-xs">{getHumanReadableDate(item.timestamp)}</span>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="bg-gray-50 px-4 py-2 text-gray-950 border-b border-gray-300">No history data available.</p>
                        )}
                    </div>
                    <div className="mt-4">
                        <Button
                            onClick={onDeleteClick}
                            type="secondary"
                            className="float-right"
                        >
                            Delete History
                        </Button>
                    </div>
                </div>
            </details>
        </div>
    )
}

export default History
