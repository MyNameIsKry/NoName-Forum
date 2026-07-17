import { Box, Button, Typography, Alert } from "@mui/material";

interface EmptyStateProps {
    message?: string;
    ctaLabel?: string;
    ctaHref?: string;
}

const EmptyState: React.FC<EmptyStateProps> = ({
    message = "Chưa có bài viết nào.",
    ctaLabel = "Tạo bài viết mới",
    ctaHref = "/post/create"
}) => {
    return (
        <Box className="flex flex-col items-center justify-center py-16 text-gray-400">
            <Typography variant="h6" className="mb-4 text-center">
                {message}
            </Typography>
            {ctaLabel && ctaHref && (
                <Button
                    href={ctaHref}
                    variant="contained"
                    color="primary"
                    sx={{ mt: 1 }}
                >
                    {ctaLabel}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
