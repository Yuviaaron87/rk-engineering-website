import React, { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'motion/react';
import {
  LogOut,
  Search,
  Mail,
  Phone,
  MessageSquare,
  Trash2,
  CheckCircle,
  Clock,
  Download,
  Eye,
  X,
  Zap,
  Building2,
  RefreshCw,
  ExternalLink,
  UserCheck,
} from 'lucide-react';
import { Button } from '../components/Button';
import { ROUTES, COMPANY_DETAILS } from '../constants/route';
import {
  getEnquiries,
  updateEnquiryStatus,
  deleteEnquiry,
  clearAllEnquiries,
  type Enquiry,
} from '../utils/storage';

export const AdminDashboard: React.FC = () => {
  const navigate = useNavigate();
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'unread' | 'read' | 'responded'>('all');
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [notification, setNotification] = useState<string>('');

  // Protect Admin route
  useEffect(() => {
    const isAuth = sessionStorage.getItem('rk_admin_auth');
    if (isAuth !== 'true') {
      navigate(ROUTES.ADMIN_LOGIN);
    } else {
      loadEnquiries();
    }
  }, [navigate]);

  const loadEnquiries = () => {
    const data = getEnquiries();
    setEnquiries(data);
  };

  const handleLogout = () => {
    sessionStorage.removeItem('rk_admin_auth');
    sessionStorage.removeItem('rk_admin_user');
    navigate(ROUTES.ADMIN_LOGIN);
  };

  const handleStatusChange = (id: string, status: Enquiry['status']) => {
    const updated = updateEnquiryStatus(id, status);
    setEnquiries(updated);
    if (selectedEnquiry?.id === id) {
      setSelectedEnquiry((prev) => (prev ? { ...prev, status } : null));
    }
    showNotification(`Status updated to "${status}"`);
  };

  const handleDelete = (id: string) => {
    if (window.confirm('Are you sure you want to delete this enquiry?')) {
      const updated = deleteEnquiry(id);
      setEnquiries(updated);
      if (selectedEnquiry?.id === id) {
        setSelectedEnquiry(null);
      }
      showNotification('Enquiry deleted successfully');
    }
  };

  const handleClearAll = () => {
    if (window.confirm('WARNING: Are you sure you want to clear all message logs?')) {
      const updated = clearAllEnquiries();
      setEnquiries(updated);
      setSelectedEnquiry(null);
      showNotification('All enquiry logs cleared');
    }
  };

  const showNotification = (text: string) => {
    setNotification(text);
    setTimeout(() => setNotification(''), 3000);
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (enquiries.length === 0) {
      showNotification('No enquiries available to export');
      return;
    }

    const headers = ['ID', 'Full Name', 'Company Name', 'Phone', 'Email', 'Service Required', 'Message', 'Date', 'Status'];
    const rows = enquiries.map((e) => [
      e.id,
      `"${e.fullName.replace(/"/g, '""')}"`,
      `"${(e.companyName || 'N/A').replace(/"/g, '""')}"`,
      `"${e.phone}"`,
      `"${e.email}"`,
      `"${e.serviceRequired}"`,
      `"${e.message.replace(/"/g, '""')}"`,
      `"${new Date(e.createdAt).toLocaleString()}"`,
      `"${e.status}"`,
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map((r) => r.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `RK_Engineering_Enquiries_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    showNotification('CSV exported successfully');
  };

  // Filtered Enquiries
  const filteredEnquiries = enquiries.filter((item) => {
    const matchesStatus = statusFilter === 'all' || item.status === statusFilter;
    const q = searchQuery.toLowerCase();
    const matchesSearch =
      item.fullName.toLowerCase().includes(q) ||
      item.companyName.toLowerCase().includes(q) ||
      item.phone.toLowerCase().includes(q) ||
      item.email.toLowerCase().includes(q) ||
      item.serviceRequired.toLowerCase().includes(q) ||
      item.message.toLowerCase().includes(q);

    return matchesStatus && matchesSearch;
  });

  // Metrics
  const totalCount = enquiries.length;
  const unreadCount = enquiries.filter((e) => e.status === 'unread').length;
  const respondedCount = enquiries.filter((e) => e.status === 'responded').length;

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 font-['Plus_Jakarta_Sans',sans-serif]">
      {/* Top Admin Bar */}
      <header className="bg-white border-b border-slate-200/90 sticky top-0 z-30 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-600 to-blue-700 flex items-center justify-center text-white border border-sky-400/40 shadow-md">
              <Zap className="w-6 h-6 fill-white text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-lg font-extrabold text-slate-900 tracking-wider font-['Plus_Jakarta_Sans']">
                  RK ENGINEERING
                </span>
                <span className="px-2 py-0.5 rounded-full bg-sky-100 text-sky-800 text-[10px] font-bold uppercase tracking-wider">
                  Admin Dashboard
                </span>
              </div>
              <span className="text-xs text-slate-500 font-medium block">
                Logged in as: <strong className="text-slate-800 font-bold">Admin</strong> ({COMPANY_DETAILS.owner})
              </span>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link to={ROUTES.HOME} target="_blank">
              <Button variant="outline" size="sm" icon={ExternalLink}>
                View Website
              </Button>
            </Link>
            <Button variant="secondary" size="sm" icon={LogOut} onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </header>

      {/* Notification Toast */}
      <AnimatePresence>
        {notification && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-20 right-6 z-50 px-4 py-2.5 rounded-xl bg-slate-900 text-white text-xs font-semibold shadow-2xl border border-slate-700 flex items-center gap-2"
          >
            <CheckCircle className="w-4 h-4 text-emerald-400" />
            <span>{notification}</span>
          </motion.div>
        )}
      </AnimatePresence>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
        {/* Metric Overview Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Total Enquiries
              </span>
              <span className="text-3xl font-extrabold text-slate-900 mt-1 block">
                {totalCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-700">
              <MessageSquare className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-sky-700 uppercase tracking-wider block">
                Unread Messages
              </span>
              <span className="text-3xl font-extrabold text-sky-600 mt-1 block">
                {unreadCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-sky-50 border border-sky-200 flex items-center justify-center text-sky-600 relative">
              {unreadCount > 0 && (
                <span className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-sky-500 animate-ping" />
              )}
              <Clock className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-emerald-700 uppercase tracking-wider block">
                Responded Leads
              </span>
              <span className="text-3xl font-extrabold text-emerald-600 mt-1 block">
                {respondedCount}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-600">
              <UserCheck className="w-6 h-6" />
            </div>
          </div>

          <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex items-center justify-between">
            <div>
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
                Target Email
              </span>
              <span className="text-xs font-bold text-slate-900 mt-1 block truncate max-w-[140px]">
                {COMPANY_DETAILS.email}
              </span>
            </div>
            <div className="w-12 h-12 rounded-xl bg-blue-50 border border-blue-200 flex items-center justify-center text-blue-600">
              <Mail className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Filter & Controls Bar */}
        <div className="p-6 rounded-2xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Search Box */}
          <div className="relative w-full md:w-80">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search enquiries..."
              className="w-full pl-10 pr-4 py-2.5 rounded-xl bg-slate-50 text-slate-900 placeholder-slate-400 border border-slate-200 focus:border-sky-500 focus:bg-white focus:outline-none text-xs font-medium transition-all"
            />
          </div>

          {/* Status Tabs */}
          <div className="flex items-center gap-1.5 overflow-x-auto w-full md:w-auto">
            {(['all', 'unread', 'read', 'responded'] as const).map((st) => (
              <button
                key={st}
                onClick={() => setStatusFilter(st)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold capitalize transition-all cursor-pointer ${
                  statusFilter === st
                    ? 'bg-sky-600 text-white shadow-xs'
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {st}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 w-full md:w-auto justify-end">
            <Button variant="outline" size="sm" icon={Download} onClick={handleExportCSV}>
              Export CSV
            </Button>
            <Button variant="secondary" size="sm" icon={RefreshCw} onClick={loadEnquiries}>
              Refresh
            </Button>
          </div>
        </div>

        {/* Enquiries Table / List */}
        <div className="rounded-2xl bg-white border border-slate-200/90 shadow-md overflow-hidden">
          <div className="p-4 sm:p-6 border-b border-slate-200/90 flex items-center justify-between">
            <h2 className="text-lg font-extrabold text-slate-900">
              Client Enquiries & Requirements ({filteredEnquiries.length})
            </h2>
            {enquiries.length > 0 && (
              <button
                onClick={handleClearAll}
                className="text-xs font-semibold text-red-600 hover:text-red-700 flex items-center gap-1 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear All Logs</span>
              </button>
            )}
          </div>

          {filteredEnquiries.length === 0 ? (
            <div className="py-16 text-center space-y-3">
              <MessageSquare className="w-12 h-12 text-slate-300 mx-auto" />
              <div className="text-slate-700 font-bold text-base">No enquiries found</div>
              <p className="text-slate-400 text-xs max-w-sm mx-auto">
                No messages match your current filter or search criteria.
              </p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-slate-50 text-slate-500 uppercase font-bold tracking-wider border-b border-slate-200">
                    <th className="py-3.5 px-4 sm:px-6">Status</th>
                    <th className="py-3.5 px-4 sm:px-6">Client / Company</th>
                    <th className="py-3.5 px-4 sm:px-6">Contact Info</th>
                    <th className="py-3.5 px-4 sm:px-6">Service Required</th>
                    <th className="py-3.5 px-4 sm:px-6">Date Received</th>
                    <th className="py-3.5 px-4 sm:px-6 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {filteredEnquiries.map((item) => (
                    <tr
                      key={item.id}
                      className={`hover:bg-slate-50/80 transition-colors ${
                        item.status === 'unread' ? 'bg-sky-50/40 font-medium' : ''
                      }`}
                    >
                      {/* Status */}
                      <td className="py-4 px-4 sm:px-6">
                        <select
                          value={item.status}
                          onChange={(e) => handleStatusChange(item.id, e.target.value as Enquiry['status'])}
                          className={`px-2.5 py-1 rounded-lg text-[11px] font-bold border focus:outline-none cursor-pointer ${
                            item.status === 'unread'
                              ? 'bg-sky-100 text-sky-800 border-sky-300'
                              : item.status === 'responded'
                              ? 'bg-emerald-100 text-emerald-800 border-emerald-300'
                              : 'bg-slate-100 text-slate-700 border-slate-300'
                          }`}
                        >
                          <option value="unread">Unread</option>
                          <option value="read">Read</option>
                          <option value="responded">Responded</option>
                        </select>
                      </td>

                      {/* Client */}
                      <td className="py-4 px-4 sm:px-6">
                        <div className="font-extrabold text-slate-900 text-sm">{item.fullName}</div>
                        {item.companyName && (
                          <div className="text-slate-500 text-[11px] flex items-center gap-1 mt-0.5 font-semibold">
                            <Building2 className="w-3 h-3 text-slate-400" />
                            <span>{item.companyName}</span>
                          </div>
                        )}
                      </td>

                      {/* Contact Info */}
                      <td className="py-4 px-4 sm:px-6 space-y-1">
                        <a
                          href={`tel:${item.phone.replace(/\s+/g, '')}`}
                          className="text-slate-800 hover:text-sky-600 font-bold flex items-center gap-1.5"
                        >
                          <Phone className="w-3.5 h-3.5 text-sky-600" />
                          <span>{item.phone}</span>
                        </a>
                        <a
                          href={`mailto:${item.email}`}
                          className="text-slate-500 hover:text-sky-600 text-[11px] flex items-center gap-1.5 truncate max-w-[180px]"
                        >
                          <Mail className="w-3.5 h-3.5 text-slate-400" />
                          <span className="truncate">{item.email}</span>
                        </a>
                      </td>

                      {/* Service Required */}
                      <td className="py-4 px-4 sm:px-6">
                        <span className="px-2.5 py-1 rounded-md bg-slate-100 text-slate-800 font-bold text-[11px] border border-slate-200">
                          {item.serviceRequired}
                        </span>
                      </td>

                      {/* Date */}
                      <td className="py-4 px-4 sm:px-6 text-slate-500 text-[11px]">
                        {new Date(item.createdAt).toLocaleString()}
                      </td>

                      {/* Actions */}
                      <td className="py-4 px-4 sm:px-6 text-right">
                        <div className="flex items-center justify-end gap-2">
                          <button
                            onClick={() => setSelectedEnquiry(item)}
                            className="p-1.5 rounded-lg bg-sky-50 text-sky-600 border border-sky-200 hover:bg-sky-600 hover:text-white transition-colors cursor-pointer"
                            title="View Full Message"
                          >
                            <Eye className="w-4 h-4" />
                          </button>
                          <a
                            href={`https://wa.me/${item.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                              `Hello ${item.fullName}, this is Kannan R from RK ENGINEERING regarding your enquiry for ${item.serviceRequired}.`
                            )}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="p-1.5 rounded-lg bg-emerald-50 text-emerald-600 border border-emerald-200 hover:bg-emerald-600 hover:text-white transition-colors"
                            title="Reply on WhatsApp"
                          >
                            <MessageSquare className="w-4 h-4" />
                          </a>
                          <button
                            onClick={() => handleDelete(item.id)}
                            className="p-1.5 rounded-lg bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white transition-colors cursor-pointer"
                            title="Delete"
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
          )}
        </div>
      </main>

      {/* Enquiry Details Modal */}
      <AnimatePresence>
        {selectedEnquiry && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-900/50 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 20 }}
              className="bg-white rounded-3xl border border-slate-200 shadow-2xl max-w-xl w-full p-6 sm:p-8 space-y-6 relative overflow-hidden"
            >
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-sky-50 border border-sky-200 text-sky-600 flex items-center justify-center">
                    <MessageSquare className="w-4 h-4" />
                  </div>
                  <h3 className="text-xl font-extrabold text-slate-900">Enquiry Details</h3>
                </div>
                <button
                  onClick={() => setSelectedEnquiry(null)}
                  className="p-1.5 rounded-lg bg-slate-100 text-slate-500 hover:text-slate-900 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="grid grid-cols-2 gap-4 p-4 rounded-xl bg-slate-50 border border-slate-200">
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Client Name</span>
                    <span className="text-slate-900 font-extrabold text-base">{selectedEnquiry.fullName}</span>
                  </div>
                  <div>
                    <span className="text-slate-400 font-bold block uppercase text-[10px]">Company</span>
                    <span className="text-slate-800 font-bold">{selectedEnquiry.companyName || 'Not Specified'}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[10px]">Phone Number</span>
                    <a
                      href={`tel:${selectedEnquiry.phone.replace(/\s+/g, '')}`}
                      className="text-sky-700 font-bold hover:underline"
                    >
                      {selectedEnquiry.phone}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-500 font-bold block uppercase text-[10px]">Email Address</span>
                    <a
                      href={`mailto:${selectedEnquiry.email}`}
                      className="text-sky-700 font-bold hover:underline truncate block"
                    >
                      {selectedEnquiry.email}
                    </a>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500 font-bold block uppercase text-[10px] mb-1">Service Requested</span>
                  <span className="px-3 py-1.5 rounded-lg bg-sky-50 text-sky-800 font-bold text-xs border border-sky-200 inline-block">
                    {selectedEnquiry.serviceRequired}
                  </span>
                </div>

                <div>
                  <span className="text-slate-500 font-bold block uppercase text-[10px] mb-1">Requirement Details / Message</span>
                  <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-slate-800 leading-relaxed font-normal">
                    {selectedEnquiry.message}
                  </div>
                </div>

                <div className="text-[11px] text-slate-400">
                  Logged on: {new Date(selectedEnquiry.createdAt).toLocaleString()}
                </div>
              </div>

              {/* Modal Actions */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, 'responded')}
                    className="px-3 py-1.5 rounded-xl bg-emerald-600 text-white text-xs font-bold hover:bg-emerald-500 cursor-pointer"
                  >
                    Mark Responded
                  </button>
                  <button
                    onClick={() => handleStatusChange(selectedEnquiry.id, 'read')}
                    className="px-3 py-1.5 rounded-xl bg-slate-200 text-slate-800 text-xs font-bold hover:bg-slate-300 cursor-pointer"
                  >
                    Mark Read
                  </button>
                </div>

                <a
                  href={`https://wa.me/${selectedEnquiry.phone.replace(/[^0-9]/g, '')}?text=${encodeURIComponent(
                    `Hello ${selectedEnquiry.fullName}, this is Kannan R from RK ENGINEERING regarding your enquiry for ${selectedEnquiry.serviceRequired}.`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="whatsapp" size="sm">
                    Reply on WhatsApp
                  </Button>
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
