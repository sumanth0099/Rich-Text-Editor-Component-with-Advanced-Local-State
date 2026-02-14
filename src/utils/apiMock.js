

const API_DELAY = 500;

export const mockApi = {

  getDocument: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          id: 'doc-123',
          content: '<p>Welcome to the Rich Text Editor</p>',
          lastModified: new Date().toISOString(),
          authorId: 'user-1'
        });
      }, API_DELAY);
    });
  },


  saveDocument: async (data) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        console.log('Document saved:', data);
        resolve({
          success: true,
          timestamp: new Date().toISOString()
        });
      }, API_DELAY);
    });
  },


  getActiveUsers: async () => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve([
          { id: 'user-1', name: 'Current User', color: '#007bff', status: 'active' },
          { id: 'user-2', name: 'Other User 1', color: '#28a745', status: 'viewing' },
          { id: 'user-3', name: 'Other User 2', color: '#ffc107', status: 'editing' }
        ]);
      }, API_DELAY);
    });
  }
};
