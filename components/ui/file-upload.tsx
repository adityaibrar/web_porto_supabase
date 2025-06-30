'use client';

import { useState, useRef } from 'react';
import { Button } from './button';
import { Input } from './input';
import { Label } from './label';
import { Upload, X, FileText, Image } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploadProps {
  onFileSelect: (file: File) => void;
  accept: string;
  maxSize?: number; // in MB
  currentFile?: string;
  onRemove?: () => void;
  label?: string;
  className?: string;
}

export function FileUpload({
  onFileSelect,
  accept,
  maxSize = 5,
  currentFile,
  onRemove,
  label,
  className
}: FileUploadProps) {
  const [dragActive, setDragActive] = useState(false);
  const [error, setError] = useState<string>('');
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (e.target.files && e.target.files[0]) {
      handleFile(e.target.files[0]);
    }
  };

  const handleFile = (file: File) => {
    setError('');

    // Check file size
    if (file.size > maxSize * 1024 * 1024) {
      setError(`File size must be less than ${maxSize}MB`);
      return;
    }

    // Check file type
    const acceptedTypes = accept.split(',').map(type => type.trim());
    const fileType = file.type;
    const isValidType = acceptedTypes.some(type => {
      if (type.startsWith('.')) {
        return file.name.toLowerCase().endsWith(type.toLowerCase());
      }
      return fileType.match(type.replace('*', '.*'));
    });

    if (!isValidType) {
      setError(`File type not supported. Accepted types: ${accept}`);
      return;
    }

    onFileSelect(file);
  };

  const getFileIcon = (fileName: string) => {
    const ext = fileName.split('.').pop()?.toLowerCase();
    if (ext === 'pdf') {
      return <FileText className="w-8 h-8 text-red-500" />;
    }
    return <Image className="w-8 h-8 text-blue-500" />;
  };

  return (
    <div className={cn('space-y-2', className)}>
      {label && <Label>{label}</Label>}
      
      {currentFile ? (
        <div className="flex items-center justify-between p-4 border border-border rounded-lg bg-muted/50">
          <div className="flex items-center space-x-3">
            {getFileIcon(currentFile)}
            <div>
              <p className="text-sm font-medium">Current file</p>
              <p className="text-xs text-muted-foreground">{currentFile.split('/').pop()}</p>
            </div>
          </div>
          {onRemove && (
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={onRemove}
            >
              <X className="w-4 h-4" />
            </Button>
          )}
        </div>
      ) : (
        <div
          className={cn(
            'relative border-2 border-dashed rounded-lg p-6 transition-colors',
            dragActive ? 'border-primary bg-primary/5' : 'border-border',
            'hover:border-primary/50 hover:bg-muted/50'
          )}
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <Input
            ref={inputRef}
            type="file"
            accept={accept}
            onChange={handleChange}
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
          />
          
          <div className="text-center">
            <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm font-medium">
              Drop files here or click to upload
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Max size: {maxSize}MB • Accepted: {accept}
            </p>
          </div>
        </div>
      )}

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}
    </div>
  );
}