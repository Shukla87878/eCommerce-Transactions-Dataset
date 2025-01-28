import React from 'react';

export const ClusteringSection = ({ result }) => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-medium mb-2">Clustering Metrics</h3>
          <div className="space-y-2">
            <p>Number of Clusters: {result.numberOfClusters}</p>
            <p>Davies-Bouldin Index: {result.dbIndex.toFixed(3)}</p>
          </div>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-medium mb-4">Cluster Analysis</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {result.clusters.map((cluster) => (
            <div
              key={cluster.id}
              className="bg-white p-6 rounded-lg shadow-sm border border-gray-200"
            >
              <h4 className="font-medium mb-2">Cluster {cluster.id + 1}</h4>
              <p className="text-sm text-gray-500 mb-4">Size: {cluster.size} customers</p>
              <ul className="space-y-1">
                {cluster.characteristics.map((char, index) => (
                  <li key={index} className="text-sm">
                    • {char}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};