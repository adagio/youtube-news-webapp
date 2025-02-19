import React from 'react';
import { 
  Card, 
  CardContent, 
  Typography, 
  Button, 
  Box,
  Grid,
  IconButton,
  CardActions,
  CircularProgress 
} from '@mui/material';
import { Launch } from '@mui/icons-material';

const VideoGrid = ({ videos, loading, hasMore, onLoadMore }) => {
  // Ensure videos is always an array
  const videoArray = Array.isArray(videos) ? videos : [];

  if (loading && videoArray.length === 0) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 4 }}>
      <Grid container spacing={3}>
        {videoArray.map((video) => (
          <Grid item xs={12} md={6} lg={4} key={video.id}>
            <Card elevation={3} sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
              <CardContent>
                <Typography variant="h6" component="h3" gutterBottom>
                  {video.title}
                </Typography>
                <Typography variant="subtitle2" color="text.secondary" sx={{ mb: 1 }}>
                  {video.channelName} • {new Date(video.uploadDate).toLocaleString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: false
                  })}
                </Typography>
              </CardContent>
              <CardActions sx={{ marginTop: 'auto' }}>
                <IconButton 
                  component="a"
                  href={video.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  color="primary"
                  aria-label="view video"
                >
                  <Launch />
                </IconButton>
              </CardActions>
            </Card>
          </Grid>
        ))}
      </Grid>
      {hasMore && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Button
            variant="contained"
            size="large"
            onClick={onLoadMore}
            disabled={loading}
            sx={{ 
              minWidth: 200,
              py: 1.5,
              borderRadius: 2,
              textTransform: 'none',
              fontSize: '1.1rem'
            }}
          >
            {loading ? 'Loading...' : 'Load More'}
          </Button>
        </Box>
      )}
    </Box>
  );
};

export default VideoGrid;