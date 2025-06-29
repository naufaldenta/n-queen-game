import React from 'react';
import { Search, Waves, RotateCcw, List } from 'lucide-react';
import type { AlgorithmType } from '../types';

interface AlgorithmInfoProps {
  algorithmType: AlgorithmType;
}

const AlgorithmInfo: React.FC<AlgorithmInfoProps> = ({ algorithmType }) => {
  return (
    <div className="bg-white rounded-lg shadow-lg p-6">
      <h3 className="text-xl font-bold text-gray-800 mb-4">
        Penjelasan Algoritma: {algorithmType}
      </h3>
      
      {algorithmType === 'DFS' ? (
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Search className="w-5 h-5 text-blue-600" />
              <h4 className="font-semibold text-gray-700">Depth-First Search (DFS)</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              DFS mengeksplorasi solusi dengan mendalami satu jalur hingga mentok, 
              kemudian mundur (backtrack) untuk mencoba jalur lain.
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <RotateCcw className="w-5 h-5 text-red-600" />
              <h5 className="font-medium text-gray-700">Cara Kerja Backtracking:</h5>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Tempatkan queen di posisi yang aman pada baris saat ini</li>
              <li>Lanjut ke baris berikutnya secara rekursif</li>
              <li>Jika tidak ada posisi aman, lakukan backtrack</li>
              <li>Hapus queen dari posisi sebelumnya dan coba posisi lain</li>
            </ul>
          </div>
          
          <div className="bg-blue-50 p-3 rounded-md">
            <p className="text-sm text-blue-800">
              <strong>Keunggulan:</strong> Efisien dalam memori, menemukan solusi dengan cepat
            </p>
            <p className="text-sm text-blue-800">
              <strong>Kompleksitas Waktu:</strong> O(N!) dalam kasus terburuk
            </p>
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <Waves className="w-5 h-5 text-green-600" />
              <h4 className="font-semibold text-gray-700">Breadth-First Search (BFS)</h4>
            </div>
            <p className="text-sm text-gray-600 mb-3">
              BFS mengeksplorasi semua kemungkinan pada level yang sama sebelum 
              beralih ke level berikutnya menggunakan antrian (queue).
            </p>
          </div>
          
          <div>
            <div className="flex items-center space-x-2 mb-2">
              <List className="w-5 h-5 text-green-600" />
              <h5 className="font-medium text-gray-700">Cara Kerja dengan Queue:</h5>
            </div>
            <ul className="text-sm text-gray-600 space-y-1 list-disc list-inside">
              <li>Masukkan state awal ke dalam queue</li>
              <li>Ambil state dari queue, coba semua posisi yang valid</li>
              <li>Masukkan state baru ke queue untuk level berikutnya</li>
              <li>Ulangi hingga solusi ditemukan atau queue kosong</li>
            </ul>
          </div>
          
          <div className="bg-green-50 p-3 rounded-md">
            <p className="text-sm text-green-800">
              <strong>Keunggulan:</strong> Menjamin solusi optimal (jika ada)
            </p>
            <p className="text-sm text-green-800">
              <strong>Kompleksitas Ruang:</strong> Lebih besar karena menyimpan banyak state
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default AlgorithmInfo;
