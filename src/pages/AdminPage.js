import { useState } from 'react';
// import {
//   Users,
//   Search,
//   Plus,
//   Edit,
//   Trash2,
//   RotateCcw,
//   Download,
//   BarChart3,
//   TrendingUp,
//   Activity,
//   UserCheck,
// } from 'lucide-react';

const AdminPage = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([
    {
      id: 1,
      username: 'john_doe',
      email: 'john@example.com',
      name: '홍길동',
      role: 'user',
      status: 'active',
      lastLogin: '2025-06-04 14:30',
      createdAt: '2025-01-15',
      loginCount: 45,
    },
    {
      id: 2,
      username: 'admin_user',
      email: 'admin@example.com',
      name: '관리자',
      role: 'admin',
      status: 'active',
      lastLogin: '2025-06-04 09:15',
      createdAt: '2024-12-01',
      loginCount: 120,
    },
    {
      id: 3,
      username: 'test_user',
      email: 'test@example.com',
      name: '테스트유저',
      role: 'user',
      status: 'suspended',
      lastLogin: '2025-05-28 16:45',
      createdAt: '2025-02-10',
      loginCount: 23,
    },
  ]);

  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [showUserModal, setShowUserModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // 통계 데이터
  const [stats] = useState({
    totalUsers: 1250,
    activeUsers: 1180,
    newUsersToday: 23,
    todayLogins: 345,
    weeklyGrowth: 8.5,
    monthlyRevenue: 125000,
  });

  // 필터링된 사용자 목록
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.username.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.name.includes(searchTerm);
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesStatus =
      filterStatus === 'all' || user.status === filterStatus;
    return matchesSearch && matchesRole && matchesStatus;
  });

  // 사용자 상태 변경
  const updateUserStatus = (userId, newStatus) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, status: newStatus } : user
      )
    );
  };

  // 사용자 역할 변경
  const updateUserRole = (userId, newRole) => {
    setUsers(
      users.map((user) =>
        user.id === userId ? { ...user, role: newRole } : user
      )
    );
  };

  // 사용자 삭제
  const deleteUser = (userId) => {
    if (window.confirm('정말 이 사용자를 삭제하시겠습니까?')) {
      setUsers(users.filter((user) => user.id !== userId));
    }
  };

  // 비밀번호 초기화
  const resetPassword = (userId) => {
    if (window.confirm('이 사용자의 비밀번호를 초기화하시겠습니까?')) {
      alert(
        '비밀번호가 초기화되었습니다. 임시 비밀번호가 이메일로 발송됩니다.'
      );
    }
  };

  // 사용자 모달 컴포넌트
  const UserModal = ({ user, onClose, onSave }) => {
    const [formData, setFormData] = useState(
      user || {
        username: '',
        email: '',
        name: '',
        role: 'user',
        status: 'active',
      }
    );

    const handleSubmit = () => {
      if (formData.username && formData.email && formData.name) {
        onSave(formData);
        onClose();
      }
    };

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-full max-w-md">
          <h3 className="text-lg font-semibold mb-4">
            {user ? '사용자 수정' : '새 사용자 생성'}
          </h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">사용자명</label>
              <input
                type="text"
                value={formData.username}
                onChange={(e) =>
                  setFormData({ ...formData, username: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">이메일</label>
              <input
                type="email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">이름</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">역할</label>
              <select
                value={formData.role}
                onChange={(e) =>
                  setFormData({ ...formData, role: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="user">일반 사용자</option>
                <option value="admin">관리자</option>
                <option value="moderator">모더레이터</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">상태</label>
              <select
                value={formData.status}
                onChange={(e) =>
                  setFormData({ ...formData, status: e.target.value })
                }
                className="w-full px-3 py-2 border rounded-md"
              >
                <option value="active">활성</option>
                <option value="inactive">비활성</option>
                <option value="suspended">정지</option>
              </select>
            </div>
            <div className="flex gap-2 pt-4">
              <button
                onClick={handleSubmit}
                className="flex-1 bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700"
              >
                저장
              </button>
              <button
                onClick={onClose}
                className="flex-1 bg-gray-300 text-gray-700 py-2 rounded-md hover:bg-gray-400"
              >
                취소
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 헤더 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <h1 className="text-2xl font-bold text-gray-900">
              관리자 대시보드
            </h1>
            <div className="flex space-x-2">
              <button
                onClick={() => setActiveTab('users')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'users'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <Users className="w-4 h-4 inline-block mr-2" />
                사용자 관리
              </button>
              <button
                onClick={() => setActiveTab('analytics')}
                className={`px-4 py-2 rounded-md ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <BarChart3 className="w-4 h-4 inline-block mr-2" />
                통계 및 분석
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'users' && (
          <div>
            {/* 사용자 관리 헤더 */}
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-xl font-semibold">사용자 관리</h2>
              <button
                onClick={() => setShowUserModal(true)}
                className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 flex items-center gap-2"
              >
                <Plus className="w-4 h-4" />새 사용자 추가
              </button>
            </div>

            {/* 검색 및 필터 */}
            <div className="bg-white rounded-lg shadow p-4 mb-6">
              <div className="flex flex-wrap gap-4">
                <div className="flex-1 min-w-64">
                  <div className="relative">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input
                      type="text"
                      placeholder="사용자명, 이메일, 이름으로 검색..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border rounded-md"
                    />
                  </div>
                </div>
                <select
                  value={filterRole}
                  onChange={(e) => setFilterRole(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">모든 역할</option>
                  <option value="admin">관리자</option>
                  <option value="user">일반 사용자</option>
                  <option value="moderator">모더레이터</option>
                </select>
                <select
                  value={filterStatus}
                  onChange={(e) => setFilterStatus(e.target.value)}
                  className="px-3 py-2 border rounded-md"
                >
                  <option value="all">모든 상태</option>
                  <option value="active">활성</option>
                  <option value="inactive">비활성</option>
                  <option value="suspended">정지</option>
                </select>
              </div>
            </div>

            {/* 사용자 목록 */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        사용자
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        역할
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        상태
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        마지막 로그인
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        로그인 횟수
                      </th>
                      <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                        작업
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {filteredUsers.map((user) => (
                      <tr key={user.id} className="hover:bg-gray-50">
                        <td className="px-4 py-4">
                          <div>
                            <div className="font-medium text-gray-900">
                              {user.name}
                            </div>
                            <div className="text-sm text-gray-500">
                              @{user.username}
                            </div>
                            <div className="text-sm text-gray-500">
                              {user.email}
                            </div>
                          </div>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={user.role}
                            onChange={(e) =>
                              updateUserRole(user.id, e.target.value)
                            }
                            className="text-sm border rounded px-2 py-1"
                          >
                            <option value="user">일반 사용자</option>
                            <option value="admin">관리자</option>
                            <option value="moderator">모더레이터</option>
                          </select>
                        </td>
                        <td className="px-4 py-4">
                          <select
                            value={user.status}
                            onChange={(e) =>
                              updateUserStatus(user.id, e.target.value)
                            }
                            className={`text-sm border rounded px-2 py-1 ${
                              user.status === 'active'
                                ? 'text-green-700 bg-green-50'
                                : user.status === 'suspended'
                                ? 'text-red-700 bg-red-50'
                                : 'text-gray-700 bg-gray-50'
                            }`}
                          >
                            <option value="active">활성</option>
                            <option value="inactive">비활성</option>
                            <option value="suspended">정지</option>
                          </select>
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {user.lastLogin}
                        </td>
                        <td className="px-4 py-4 text-sm text-gray-900">
                          {user.loginCount}
                        </td>
                        <td className="px-4 py-4">
                          <div className="flex space-x-2">
                            <button
                              onClick={() => {
                                setEditingUser(user);
                                setShowUserModal(true);
                              }}
                              className="text-blue-600 hover:text-blue-800"
                              title="수정"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => resetPassword(user.id)}
                              className="text-yellow-600 hover:text-yellow-800"
                              title="비밀번호 초기화"
                            >
                              <RotateCcw className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => deleteUser(user.id)}
                              className="text-red-600 hover:text-red-800"
                              title="삭제"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'analytics' && (
          <div>
            <h2 className="text-xl font-semibold mb-6">통계 및 분석</h2>

            {/* 주요 지표 카드 */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      전체 사용자
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.totalUsers.toLocaleString()}
                    </p>
                  </div>
                  <Users className="w-8 h-8 text-blue-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      활성 사용자
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.activeUsers.toLocaleString()}
                    </p>
                  </div>
                  <UserCheck className="w-8 h-8 text-green-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      오늘 신규 가입
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.newUsersToday}
                    </p>
                  </div>
                  <TrendingUp className="w-8 h-8 text-purple-600" />
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">
                      오늘 로그인
                    </p>
                    <p className="text-2xl font-bold text-gray-900">
                      {stats.todayLogins}
                    </p>
                  </div>
                  <Activity className="w-8 h-8 text-orange-600" />
                </div>
              </div>
            </div>

            {/* 차트 및 상세 분석 */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* 사용자 활동 분석 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">사용자 활동 분석</h3>
                  <button className="text-blue-600 hover:text-blue-800">
                    <Download className="w-4 h-4" />
                  </button>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">주간 성장률</span>
                    <span className="text-sm font-medium text-green-600">
                      +{stats.weeklyGrowth}%
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      월간 활성 사용자
                    </span>
                    <span className="text-sm font-medium">
                      {(stats.activeUsers * 0.85).toLocaleString()}
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">
                      평균 세션 시간
                    </span>
                    <span className="text-sm font-medium">8분 32초</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">페이지뷰/세션</span>
                    <span className="text-sm font-medium">4.2</span>
                  </div>
                </div>
              </div>

              {/* 트래픽 분석 */}
              <div className="bg-white rounded-lg shadow p-6">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-lg font-semibold">트래픽 분석</h3>
                  <select className="text-sm border rounded px-2 py-1">
                    <option>지난 7일</option>
                    <option>지난 30일</option>
                    <option>지난 3개월</option>
                  </select>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">총 방문수</span>
                    <span className="text-sm font-medium">23,450</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">순 방문자</span>
                    <span className="text-sm font-medium">18,320</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">이탈률</span>
                    <span className="text-sm font-medium">35.2%</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">모바일 비율</span>
                    <span className="text-sm font-medium">68.5%</span>
                  </div>
                </div>
              </div>
            </div>

            {/* 데이터 내보내기 */}
            <div className="bg-white rounded-lg shadow p-6 mt-6">
              <h3 className="text-lg font-semibold mb-4">데이터 내보내기</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  사용자 리스트 (CSV)
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  활동 로그 (Excel)
                </button>
                <button className="flex items-center justify-center gap-2 px-4 py-2 border rounded-md hover:bg-gray-50">
                  <Download className="w-4 h-4" />
                  통계 리포트 (PDF)
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* 사용자 생성/수정 모달 */}
      {showUserModal && (
        <UserModal
          user={editingUser}
          onClose={() => {
            setShowUserModal(false);
            setEditingUser(null);
          }}
          onSave={(userData) => {
            if (editingUser) {
              setUsers(
                users.map((user) =>
                  user.id === editingUser.id ? { ...user, ...userData } : user
                )
              );
            } else {
              setUsers([
                ...users,
                {
                  ...userData,
                  id: Math.max(...users.map((u) => u.id)) + 1,
                  createdAt: new Date().toISOString().split('T')[0],
                  lastLogin: '-',
                  loginCount: 0,
                },
              ]);
            }
          }}
        />
      )}
    </div>
  );
};

export default AdminPage;
